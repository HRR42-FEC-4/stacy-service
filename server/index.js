const express = require('express');
const { Artist, Artwork, db } = require('./models');
const routes = require('./routes');

const port = 3000;

/*
db.authenticate()
  .then(() => {
    console.log('Success: Connected to DB');
    db.sync({force: true}).then(() => {
      console.log('All tables created');
    }).catch(err => console.log('Error creating tables', err));
  })
  .catch(err => {
    console.error('Unable to connect to the DB', err);
  });
*/

( async () => {
  try {
    await db.authenticate();
    console.log('Success: Connected to DB');
    await db.sync(/*{force: true}*/);
    console.log('All tables created');

    // Only begin below after db connnection, as the db connection is required for all going forth
    const app = express();
    app.use(express.json())

    app.get('/', (req, res) => {
      res.send('This section will be updated!');
    });

    app.use('/', routes);

    app.listen(port, () => console.log(`Listening on port ${port}`))
  } catch (err) {
    console.log('An error occurred!', err)
  }
})();