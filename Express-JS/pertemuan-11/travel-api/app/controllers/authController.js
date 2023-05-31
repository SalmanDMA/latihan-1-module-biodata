const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const configRoles = require('../config/configRoles');

const User = require('../models').User;

// Controller untuk login
exports.login = async (req, res) => {
 const { email, password } = req.body;

 try {
  // Cari pengguna berdasarkan email
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
   return res.status(401).json({ message: 'Invalid email ' });
  }
  // Periksa kecocokan password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
   return res.status(401).json({ message: 'Invalid  password' });
  }

  // Buat token JWT dengan informasi peran pengguna
  const token = 'Bearer ' + jwt.sign({ userId: user.id, email: user.email, role: user.role }, configRoles.secret, { expiresIn: '1h' });

  // Kirim token ke klien
  res.json({
   token,
   message: 'Login successful',
  });
 } catch (error) {
  console.error('Error logging in:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Controller untuk registrasi
exports.register = async (req, res) => {
 const { name, email, password, role } = req.body;

 try {
  // Periksa apakah pengguna sudah terdaftar
  const existingUser = await User.findOne({
   where: { email: email },
  });
  if (existingUser) {
   return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Buat pengguna baru dengan role yang diinputkan pengguna
  const newUser = await User.create({
   name,
   email,
   password: hashedPassword,
   role, // Role diisi dengan nilai yang diinputkan pengguna
  });

  res.json({
   name: newUser.name,
   email: newUser.email,
   password: newUser.password,
   role: newUser.role,
   message: 'Registration successful',
  });
 } catch (error) {
  console.error('Error registering user:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Middleware untuk memeriksa peran admin
exports.checkAdmin = (req, res, next) => {
 // Mengambil token dari header Authorization
 const token = req.headers.authorization;

 try {
  // Memverifikasi token
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Memeriksa apakah peran user adalah admin
  if (decodedToken.role !== configRoles.roles.ADMIN) {
   return res.status(403).json({ message: 'Access denied. Only admin can access this route' });
  }

  // Jika peran user adalah admin, lanjutkan ke middleware selanjutnya atau handler rute
  next();
 } catch (error) {
  console.error('Error checking admin role:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Middleware untuk memeriksa peran pengguna
exports.checkUserRole = (req, res, next) => {
 // Mengambil token dari header Authorization
 const token = req.headers.authorization;

 try {
  // Memverifikasi token
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Memeriksa apakah peran user sesuai dengan yang diperlukan
  if (decodedToken.role !== configRoles.roles.USER) {
   return res.status(403).json({ message: 'Access denied. Invalid user role' });
  }

  // Jika peran user sesuai, lanjutkan ke middleware selanjutnya atau handler rute
  next();
 } catch (error) {
  console.error('Error checking user role:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

exports.verifyToken = (req, res, next) => {
 const token = req.headers.authorization;

 if (!token) {
  return res.status(401).json({ message: 'Missing token' });
 }

 jwt.verify(token.slice(7).trim(), configRoles.secret, (err, decodedToken) => {
  if (err) {
   return res.status(403).json({ message: 'Invalid token' });
  }

  req.decodedToken = decodedToken;
  next();
 });
};
