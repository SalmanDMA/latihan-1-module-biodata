'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Vehicle extends Model {
  static associate(models) {
   Vehicle.hasMany(models.Schedule, { foreignKey: 'vehicleId' });
  }
 }

 Vehicle.init(
  {
   name: DataTypes.STRING,
   type: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'Vehicle',
  }
 );

 return Vehicle;
};
