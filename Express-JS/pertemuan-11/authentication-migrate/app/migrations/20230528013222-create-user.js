'use strict';

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
   id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
   },
   name: {
    type: Sequelize.STRING,
   },
   email: {
    type: Sequelize.STRING,
   },
   password: {
    type: Sequelize.STRING,
   },
   statusId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    references: {
     model: {
      tableName: 'Statuses',
     },
     key: 'id',
    },
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
   },
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users');
 },
};
