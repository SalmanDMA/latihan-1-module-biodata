const Sequelize = require('sequelize');
const sequelize = new Sequelize('biodata_pesilat_db', 'root', '', {
 host: 'localhost',
 dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.profilePesilat = require('./profilePesilat.model')(sequelize, Sequelize);

module.exports = db;
