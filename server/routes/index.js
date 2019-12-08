const router = require('express').Router();
const artist = require('./artist');
const artwork = require('./artwork');

router.use('/artists', artist);
router.use('/artworks', artwork);

module.exports = router;