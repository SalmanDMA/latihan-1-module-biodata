'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   User.belongsToMany(models.Role, {
    through: models.UserRole,
    foreignKey: 'user_id',
    otherKey: 'roleId',
    as: 'roles',
   });
  }
 }

 User.init(
  {
   id: {
    type: DataTypes.STRING,
    primaryKey: true,
   },
   name: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING,
   statusId: DataTypes.UUID,
  },
  {
   sequelize,
   modelName: 'User',
  }
 );
 return User;
};
