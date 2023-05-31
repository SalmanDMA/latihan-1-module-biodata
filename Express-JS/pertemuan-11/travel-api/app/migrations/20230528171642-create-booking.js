'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Bookings', {
   id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
     model: 'Users',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   scheduleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
     model: 'Schedules',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   paymentStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
   },
   createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
   },
   updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
   },
  });
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Bookings');
 },
};
