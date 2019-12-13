const {db} = require('./db');
const Artist = require('./Artist');
const Artwork = require('./Artwork');

Artist.hasMany(Artwork, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  db,
  Artist,
  Artwork
};
