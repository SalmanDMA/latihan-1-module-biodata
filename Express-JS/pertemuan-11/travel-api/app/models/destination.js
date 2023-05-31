'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Destination extends Model {
  static associate(models) {
   Destination.hasMany(models.Schedule, { foreignKey: 'destinationId' });
  }
 }

 Destination.init(
  {
   name: DataTypes.STRING,
   location: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'Destination',
  }
 );

 return Destination;
};
