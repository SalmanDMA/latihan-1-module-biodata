const jwt = require('jsonwebtoken');
const configRoles = require('../config/configRoles');
const { User, UserRole, Role } = require('../models');

const verifyToken = async (req, res, next) => {
 const token = req.headers.authorization;

 if (!token) {
  return res.status(401).json({ message: 'No token provided' });
 }

 try {
  const decoded = jwt.verify(token, configRoles.secret);
  const userRole = await UserRole.findOne({ where: { userId: decoded.id } });
  if (!userRole) {
   return res.status(403).json({ message: 'Invalid user role' });
  }

  const role = await Role.findOne({ where: { id: userRole.roleId } });

  if (!role) {
   return res.status(403).json({ message: 'Invalid role' });
  }

  // Menambahkan informasi role ke objek req.user
  req.user = {
   id: decoded.id,
   role: role.name,
  };

  next();
 } catch (err) {
  return res.status(403).json({
   message: 'Failed to authenticate token',
  });
 }
};

// Middleware untuk memastikan pengguna memiliki peran admin
const authorizeAdmin = async (req, res, next) => {
 const adminRole = await Role.findOne({ where: { name: 'admin' } });

 if (!adminRole.name.toUpperCase() === 'ADMIN') {
  return res.status(403).json({ message: 'Access denied' });
 }

 next();
};

module.exports = { verifyToken, authorizeAdmin };
