'use strict';
const { Model } = require('sequelize');
const AuditLog = require('./auditlog');

const order = require('./order');
const user = require('./user');
const role = require('./role');
module.exports = (sequelize, DataTypes) => {
 class Order extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Order.belongsTo(models.User, { foreignKey: 'userId' });
   Order.hasMany(models.AuditLog, { foreignKey: 'recordId', scope: { modelName: 'Order' } });
  }
 }
 Order.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   userId: DataTypes.INTEGER,
   status: DataTypes.STRING,
   name: DataTypes.STRING,
   qty: DataTypes.INTEGER,
   totalAmount: DataTypes.INTEGER,
  },
  {
   sequelize,
   modelName: 'Order',
  }
 );

 Order.addHook('beforeCreate', async (order) => {
  const auditLog = {
   orderId: order.id,
   model: 'Order',
   action: 'create',
   fieldName: 'somefield created',
   oldValue: null,
   newValue: JSON.stringify(order),
  };
  await sequelize.models.AuditLog.create(auditLog);
 });

 Order.addHook('beforeUpdate', async (order) => {
  const changedFields = order.changed();

  if (changedFields.length > 0) {
   const auditLogs = changedFields.map((field) => {
    const auditLog = {
     orderId: order.id,
     model: 'Order',
     action: 'update',
     fieldName: field,
     oldValue: order._previousDataValues[field],
     newValue: order[field],
    };

    return auditLog;
   });

   await sequelize.models.AuditLog.bulkCreate(auditLogs);
  }
 });

 Order.addHook('beforeDestroy', async (order) => {
  const auditLog = {
   orderId: order.id,
   model: 'Order',
   action: 'delete',
   fieldName: 'somefield deleted',
   oldValue: JSON.stringify(order),
   newValue: null,
  };

  await sequelize.models.AuditLog.create(auditLog);
 });

 return Order;
};
