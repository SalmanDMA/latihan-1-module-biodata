'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('audit_logs', {
   id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
   },
   userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
     model: 'Users',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   orderId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
     model: 'Orders',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   userRoleId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
     model: 'UserRoles',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   roleId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
     model: 'Roles',
     key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
   },
   model: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   action: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   fieldName: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   oldValue: {
    type: Sequelize.STRING,
    allowNull: true,
   },
   newValue: {
    type: Sequelize.STRING,
    allowNull: true,
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
  await queryInterface.dropTable('audit_logs');
 },
};
