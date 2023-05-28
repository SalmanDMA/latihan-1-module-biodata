'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class UserRole extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   UserRole.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
   });
   UserRole.belongsTo(models.Role, {
    foreignKey: 'roleId',
    as: 'role',
   });
  }
 }
 UserRole.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
   },
   user_id: DataTypes.STRING,
   roleId: DataTypes.INTEGER,
  },
  {
   sequelize,
   modelName: 'UserRole',
  }
 );
 return UserRole;
};
