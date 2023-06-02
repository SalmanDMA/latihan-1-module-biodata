'use strict';
const { Model } = require('sequelize');
const AuditLog = require('./auditlog');

const order = require('./order');
const user = require('./user');
const role = require('./role');

module.exports = (sequelize, DataTypes) => {
 class Role extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Role.hasMany(models.UserRole, { foreignKey: 'roleId' });
  }
 }
 Role.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   name: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'Role',
  }
 );

 Role.addHook('beforeCreate', async (role) => {
  const userRole = await sequelize.models.UserRole.findOne(); // Ambil userRole terkait
  const auditLog = {
   roleId: userRole.roleId,
   model: 'Role',
   action: 'create',
   fieldName: 'somefield created',
   oldValue: null,
   newValue: JSON.stringify(role),
  };

  await sequelize.models.AuditLog.create(auditLog);
 });

 Role.addHook('beforeUpdate', async (role) => {
  const changedFields = role.changed();

  if (changedFields.length > 0) {
   const auditLogs = changedFields.map((field) => {
    const auditLog = {
     roleId: role._previousDataValues.id,
     model: 'Role',
     action: 'update',
     fieldName: field,
     oldValue: role._previousDataValues[field],
     newValue: role[field],
    };

    return auditLog;
   });

   await sequelize.models.AuditLog.bulkCreate(auditLogs);
  }
 });

 Role.addHook('beforeDestroy', async (role) => {
  const auditLog = {
   roleId: role.id,
   model: 'Role',
   action: 'delete',
   fieldName: 'somefield deleted',
   oldValue: JSON.stringify(role),
   newValue: null,
  };

  await sequelize.models.AuditLog.create(auditLog);
 });

 return Role;
};
