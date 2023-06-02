const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserRole, Role } = require('../models');
const configRoles = require('../config/configRoles');

// Controller untuk login
const login = async (req, res) => {
 try {
  const { email, password } = req.body;

  // Periksa apakah pengguna dengan email yang diberikan ada di database
  const user = await User.findOne({ where: { email } });

  // Jika pengguna tidak ditemukan
  if (!user) {
   return res.status(404).json({ message: 'Email not found' });
  }

  // Periksa kecocokan password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // Jika password tidak cocok
  if (!isPasswordMatch) {
   return res.status(401).json({ message: 'Invalid password' });
  }

  // Ambil peran pengguna dari tabel UserRoles
  const userRole = await UserRole.findOne({ where: { userId: user.id } });

  // Jika peran tidak ditemukan
  if (!userRole) {
   return res.status(401).json({ message: 'Invalid role' });
  }

  // Ambil detail peran dari tabel Roles
  const role = await Role.findOne({ where: { id: userRole.roleId } });

  // Menghasilkan token JWT
  const token = jwt.sign({ id: user.id, role: role.name }, configRoles.secret, {
   expiresIn: 86400, // 24 Jam
  });

  res.status(200).json({
   message: 'User logged in successfully',
   token,
  });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

// Controller untuk register
const register = async (req, res) => {
 try {
  const { name, email, password, role } = req.body;

  // Periksa apakah pengguna dengan email yang sama sudah terdaftar
  const existingUser = await User.findOne({ where: { email } });

  // Jika pengguna sudah terdaftar
  if (existingUser) {
   return res.status(409).json({ message: 'Email already registered' });
  }

  // Hash password menggunakan bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat pengguna baru di database
  const newUser = await User.create({
   name,
   email,
   password: hashedPassword,
  });

  // Cari peran berdasarkan nama
  const userRole = await Role.findOne({ where: { name: role } });

  // Jika peran tidak ditemukan
  if (!userRole) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Buat hubungan antara pengguna dan peran di tabel UserRole
  await UserRole.create({
   userId: newUser.id,
   roleId: userRole.id,
  });

  res.status(201).json({
   message: 'User registered successfully',
   name: newUser.name,
   email: newUser.email,
   role: req.body.role,
  });
 } catch (error) {
  console.error(error);
  res.status(500).json({
   status: 'error',
   message2: error.message,
   message: 'Server error',
  });
 }
};

module.exports = {
 login,
 register,
};
