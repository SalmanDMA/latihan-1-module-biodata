require('dotenv').config();

module.exports = {
 secret: process.env.SECRET,
 roles: {
  USER: 'USER',
  ADMIN: 'ADMIN',
 },
};
