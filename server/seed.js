const faker = require('faker');
const AWS = require('aws-sdk');
const axios = require('axios');
const { Artist, Artwork, db } = require('./models');
const _ = require('lodash');

const s3 = new AWS.S3();

const NUMBER_OF_RECORDS = 100;
const MIN_ARTWORKS = 3;
const MAX_ARTWORKS = 10;
const Bucket = 'hartcom';

db.authenticate()
  .then(async () => {
    console.log('Success: Connected to DB');

    const emptyS3Directory = async (bucket) => {
      const listParams = {
        Bucket: bucket,
      };
      const listedObjects = await s3.listObjectsV2(listParams).promise();
      if (listedObjects.Contents.length === 0) return;
      const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] }
      };
      listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
      });
      await s3.deleteObjects(deleteParams).promise();
      if (listedObjects.IsTruncated) await emptyS3Directory(bucket);
    }
    await emptyS3Directory(Bucket, 'images/')
    console.log('All S3 images deleted.')


    // Drop existing (force true)
    db.sync({ force: true }).then(async () => {
      console.log('All tables created');
      try {
        const artistPromiseArr = Array.from(Array(NUMBER_OF_RECORDS).keys()).map(i => Artist.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName() }));
        await Promise.all(artistPromiseArr)

        // Randomize number of artwork - 1:n
        const artworkPromiseArr = Array.from(Array(NUMBER_OF_RECORDS).keys()).map(async i => {
          const rand = Math.floor(Math.random() * (MAX_ARTWORKS - MIN_ARTWORKS + 1) + MIN_ARTWORKS);
          return Array.from(Array(rand).keys()).map(() => {
            return new Promise(async (resolve, reject) => {
              const res = await axios.get('https://source.unsplash.com/random/500x400/?flowers,fields,tulips', { responseType: 'stream' });
              const Key = new Date().getTime() + '.jpg';
              const params = {
                ACL: 'public-read', Bucket, Key, Body: res.data,
                ContentType: res.headers['content-type'],
                ContentLength: res.headers['content-length'],
              };
              s3.putObject(params, async (err) => {
                if (err) {
                  console.log('Error uploading image', err);
                  reject(err);
                } else {
                  console.log('Successfully uploaded image');
                  await Artwork.create({ title: faker.commerce.productName(), imgUrl: `https://hartcom.s3.amazonaws.com/${Key}`, artistId: i + 1 });
                  resolve();
                }
              });
            })
          });
        });

        await Promise.all(_.flatten(artworkPromiseArr))

        console.log('Seed complete!')
      } catch (err) {
        console.log('An error occurred while seeding', err);
      }

    }).catch(err => console.log('Error creating tables', err));
  })
  .catch(err => {
    console.error('Unable to connect to the DB', err);
  });
