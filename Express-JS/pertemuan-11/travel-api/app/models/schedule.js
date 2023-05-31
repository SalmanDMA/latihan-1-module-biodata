'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Schedule extends Model {
  static associate(models) {
   Schedule.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
   Schedule.belongsTo(models.Destination, { foreignKey: 'destinationId' });
   Schedule.hasMany(models.Booking, { foreignKey: 'scheduleId' });
  }
 }

 Schedule.init(
  {
   departureTime: DataTypes.DATE,
   arrivalTime: DataTypes.DATE,
   vehicleId: DataTypes.INTEGER,
   destinationId: DataTypes.INTEGER,
  },
  {
   sequelize,
   modelName: 'Schedule',
  }
 );

 return Schedule;
};
