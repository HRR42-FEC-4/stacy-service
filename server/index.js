const express = require('express');
const { Artist, Artwork, db } = require('./models');
const routes = require('./routes');

const port = 3000;

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send({message: 'This section to be updated'});
});

app.use('/', routes);

( async () => {
  try {
    await db.authenticate();
    console.log('Success: Connected to DB');
    await db.sync(); //{force: true}
    console.log('All tables created');

    app.listen(port, () => console.log(`Listening on port ${port}`))

  } catch (err) {
    console.log('An error occurred!', err)
  }
})();

module.exports = app;