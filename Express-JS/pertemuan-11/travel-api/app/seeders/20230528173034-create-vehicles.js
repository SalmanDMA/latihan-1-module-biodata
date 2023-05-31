'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
   'Vehicles',
   [
    {
     name: 'Car 1',
     type: 'Car',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     name: 'Bike 1',
     type: 'Bike',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
   ],
   {}
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Vehicles', null, {});
 },
};
