'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  static associate(models) {
   User.hasMany(models.UserRole, { foreignKey: 'userId' });
   User.hasMany(models.AuditLog, { foreignKey: 'userId', scope: { modelName: 'User' } });
  }
 }

 User.init(
  {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   name: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'User',
   hooks: {
    beforeCreate: async (user) => {
     const auditLog = {
      userId: user.id,
      model: 'User',
      action: 'create',
      fieldName: 'somefield created',
      oldValue: null,
      newValue: JSON.stringify(user),
     };
     await sequelize.models.AuditLog.create(auditLog);
    },
    beforeUpdate: async (user) => {
     const changedFields = user.changed();
     if (changedFields.length > 0) {
      const auditLogs = changedFields.map((field) => {
       const auditLog = {
        userId: user._previousDataValues.id,
        model: 'User',
        action: 'update',
        fieldName: field,
        oldValue: user._previousDataValues[field],
        newValue: user[field],
       };

       return auditLog;
      });

      await sequelize.models.AuditLog.bulkCreate(auditLogs);
     }
    },
    beforeDestroy: async (user) => {
     const auditLog = {
      userId: user.id,
      model: 'User',
      action: 'delete',
      fieldName: 'somefield deleted',
      oldValue: JSON.stringify(user),
      newValue: null,
     };

     await sequelize.models.AuditLog.create(auditLog);
    },
   },
  }
 );

 return User;
};
