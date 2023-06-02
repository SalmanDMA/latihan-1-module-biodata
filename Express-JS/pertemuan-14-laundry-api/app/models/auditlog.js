'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class AuditLog extends Model {
  static associate(models) {
   AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
   AuditLog.belongsTo(models.Order, { foreignKey: 'orderId' });
   AuditLog.belongsTo(models.UserRole, { foreignKey: 'userRoleId' });
   AuditLog.belongsTo(models.Role, { foreignKey: 'roleId' });
  }
 }
 AuditLog.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   userId: DataTypes.INTEGER,
   orderId: DataTypes.INTEGER,
   userRoleId: DataTypes.INTEGER,
   roleId: DataTypes.INTEGER,
   model: DataTypes.STRING,
   action: DataTypes.STRING,
   fieldName: DataTypes.STRING,
   oldValue: DataTypes.STRING,
   newValue: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'AuditLog',
   tableName: 'audit_logs',
  }
 );

 return AuditLog;
};
