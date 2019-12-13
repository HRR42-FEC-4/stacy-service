const {db, Sequelize} = require('./db');

const Artwork = db.define('artwork', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Artwork;
