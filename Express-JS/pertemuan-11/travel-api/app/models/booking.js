'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Booking extends Model {
  static associate(models) {
   Booking.belongsTo(models.User, { foreignKey: 'userId' });
   Booking.belongsTo(models.Schedule, { foreignKey: 'scheduleId' });
  }
 }

 Booking.init(
  {
   userId: DataTypes.INTEGER,
   scheduleId: DataTypes.INTEGER,
   paymentStatus: DataTypes.BOOLEAN,
  },
  {
   sequelize,
   modelName: 'Booking',
  }
 );

 return Booking;
};
