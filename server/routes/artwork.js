const router = require('express').Router();
const { Artwork } = require('../models');

router.post('/', async (req, res) => {
  try {
    const createdArtwork = await Artwork.create(req.body)
    res.send(createdArtwork)
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }

});

router.get('/:artworkId', async (req, res) => {
  try {
    const foundArtwork = await Artwork.findOne({ where: { id: req.params.artworkId } });
    if (foundArtwork) {
      res.send(foundArtwork)
    } else {
      res.send({ error: 'Artwork not found!' })
    }
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
});

router.put('/:artworkId', async (req, res) => {
  try {
    await Artwork.update(req.body, { where: { id: req.params.artworkId } });
    const updatedArtwork = await Artwork.findOne({ where: { id: req.params.artworkId } });
    res.send(updatedArtwork);
  } catch (err) {
    res.send(err);
  }
});

router.delete('/:artworkId', async (req, res) => {
  try {
    await Artwork.destroy({ where: { id: req.params.artworkId } });
    res.send({ success: 'Artwork deleted' });
  } catch (err) {
    console.log('Error: ', err);
    res.send(err);
  }
});

module.exports = router;