'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class UserRole extends Model {
  static associate(models) {
   UserRole.belongsTo(models.User, { foreignKey: 'userId' });
   UserRole.belongsTo(models.Role, { foreignKey: 'roleId' });
  }
 }
 UserRole.init(
  {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   userId: DataTypes.INTEGER,
   roleId: DataTypes.INTEGER,
  },
  {
   sequelize,
   modelName: 'UserRole',
   hooks: {
    beforeCreate: async (userRole) => {
     const auditLog = {
      userRoleId: userRole.id,
      model: 'UserRole',
      action: 'create',
      fieldName: 'somefield created',
      oldValue: null,
      newValue: JSON.stringify(userRole),
     };

     await sequelize.models.AuditLog.create(auditLog);
    },
    beforeUpdate: async (userRole) => {
     const changedFields = userRole.changed();

     if (changedFields.length > 0) {
      const auditLogs = changedFields.map((field) => {
       const auditLog = {
        userRoleId: userRole.id,
        model: 'UserRole',
        action: 'update',
        fieldName: field,
        oldValue: userRole._previousDataValues[field],
        newValue: userRole[field],
       };

       return auditLog;
      });

      await sequelize.models.AuditLog.bulkCreate(auditLogs);
     }
    },
    beforeDestroy: async (userRole) => {
     const auditLog = {
      userRoleId: userRole.id,
      model: 'UserRole',
      action: 'delete',
      fieldName: 'somefield deleted',
      oldValue: JSON.stringify(userRole),
      newValue: null,
     };

     await sequelize.models.AuditLog.create(auditLog);
    },
   },
  }
 );

 return UserRole;
};
