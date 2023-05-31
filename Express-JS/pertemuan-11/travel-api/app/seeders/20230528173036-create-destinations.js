'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
   'Destinations',
   [
    {
     name: 'Destination 1',
     location: 'Location 1',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     name: 'Destination 2',
     location: 'Location 2',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
   ],
   {}
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Destinations', null, {});
 },
};
