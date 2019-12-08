const {db, Sequelize} = require('./db');

const Artist = db.define('artist', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Artist;