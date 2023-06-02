require('dotenv').config();

module.exports = {
 secret: process.env.SECRET,
 roles: {
  admin: 'admin',
  user: 'customer',
  employee: 'employee',
 },
};
