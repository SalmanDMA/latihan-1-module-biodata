'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  static associate(models) {
   User.hasMany(models.Booking, { foreignKey: 'userId' });
  }

  // static async hashPassword(password) {
  //  const hashedPassword = await bcrypt.hash(password, 10);
  //  return hashedPassword;
  // }

  // static async comparePasswords(password, hashedPassword) {
  //  const isValid = await bcrypt.compare(password, hashedPassword);
  //  return isValid;
  // }
 }

 User.init(
  {
   name: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING,
   role: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: 'User',
   // hooks: {
   //  beforeCreate: async (user) => {
   //   user.password = await User.hashPassword(user.password);
   //  },
   // },
  }
 );

 return User;
};
