'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Schedules', {
   id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   departureTime: {
    type: Sequelize.DATE,
    allowNull: false,
   },
   arrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
   },
   vehicleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
     model: 'Vehicles',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   destinationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
     model: 'Destinations',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
  await queryInterface.dropTable('Schedules');
 },
};
