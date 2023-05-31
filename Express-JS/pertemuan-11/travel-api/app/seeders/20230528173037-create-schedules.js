'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
   'Schedules',
   [
    {
     departureTime: new Date(),
     arrivalTime: new Date(),
     vehicleId: 1,
     destinationId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     departureTime: new Date(),
     arrivalTime: new Date(),
     vehicleId: 2,
     destinationId: 2,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
   ],
   {}
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Schedules', null, {});
 },
};
