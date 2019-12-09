const router = require('express').Router();
// const router = express.Router();
const { Artist, Artwork } = require('../models');


router.post('/', async (req, res) => {
  console.log('REQ body: ', req.body)

  try {
    const createdArticle = await Artist.create(req.body)
    res.send(createdArticle)
  } catch (err) {
    // console.log('Error: ', err);
    res.send(err);
  }
});


router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    let result;
    if (name) {
      result = await Artist.findOne({ where: { lastName: name }, include: [{ model: Artwork }] });
    }
    if (!result) {
      result = await Artist.findAll();
    }
    res.send(result)
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
});


router.get('/:artistId', async (req, res) => {
  console.log('REQ body in single GET', req.body)
  try {
    const foundArtist = await Artist.findOne({ where: { id: req.params.artistId }, include: [{ model: Artwork }] })
    if (foundArtist) {
      res.send(foundArtist)
    } else {
      res.send({ error: 'Artist not found!' })
    }
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
});


router.put('/:artistId', async (req, res) => {
  console.log('Req Body in PUT: ', req.body)
  try {
    await Artist.update(req.body, { where: { id: req.params.artistId } });
    const updatedArtist = await Artist.findOne({ where: { id: req.params.artistId } })
    res.send(updatedArtist)
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
})


router.delete('/:artistId', async (req, res) => {
  try {
    await Artist.destroy({ where: { id: req.params.artistId } });
    res.send({ success: 'Artist deleted' });
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
})

module.exports = router;