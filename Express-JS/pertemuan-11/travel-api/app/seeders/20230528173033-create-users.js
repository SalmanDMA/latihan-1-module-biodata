'use strict';

const bcrypt = require('bcryptjs');
const configRoles = require('../config/configRoles');

module.exports = {
 up: async (queryInterface, Sequelize) => {
  const hashedPassword = await bcrypt.hash('password', 10);

  await queryInterface.bulkInsert(
   'Users',
   [
    {
     name: 'Admin',
     email: 'admin@example.com',
     password: hashedPassword,
     role: configRoles.roles.ADMIN,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     name: 'User',
     email: 'user1@example.com',
     password: hashedPassword,
     role: configRoles.roles.USER,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
   ],
   {}
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
 },
};
