const jwt = require('jsonwebtoken');
const configRoles = require('../config/configRoles');
const Booking = require('../models').Booking;

// Controller untuk membuat booking
exports.createBooking = async (req, res) => {
 const { scheduleId, paymentStatus } = req.body;

 try {
  // Verifikasi token JWT
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Periksa apakah pengguna memiliki peran yang sesuai
  if (decodedToken.role.toLowerCase() !== 'user') {
   return res.status(403).json({ message: 'Unauthorized' });
  }

  // Buat booking baru
  const booking = await Booking.create({ userId: decodedToken.userId, scheduleId, paymentStatus });

  res.status(201).json({ message: 'Booking created successfully', booking });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Controller untuk membatalkan booking
exports.cancelBooking = async (req, res) => {
 // Ambil ID booking dari parameter rute
 const { bookingId } = req.params;

 try {
  // Verifikasi token JWT
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Periksa apakah pengguna memiliki peran yang sesuai (misalnya, admin)

  if (decodedToken.role.toLowerCase() !== 'admin') {
   return res.status(403).json({ message: 'Unauthorized' });
  }

  // Cari booking berdasarkan ID
  const booking = await Booking.findByPk(bookingId);

  // Periksa apakah booking ditemukan
  if (!booking) {
   return res.status(404).json({ message: 'Booking not found' });
  }

  // Hapus booking
  await booking.destroy();

  res.json({ message: 'Booking canceled successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Controller untuk memperbarui booking
exports.updateBooking = async (req, res) => {
 // Ambil ID booking dari parameter rute
 const { bookingId } = req.params;

 // Ambil data yang diperlukan dari permintaan
 const { scheduleId, paymentStatus } = req.body;

 try {
  // Verifikasi token JWT
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Periksa apakah pengguna memiliki peran yang sesuai
  if (decodedToken.role.toLowerCase() !== 'user') {
   return res.status(403).json({ message: 'Unauthorized' });
  }

  // Cari booking berdasarkan ID
  const booking = await Booking.findByPk(bookingId);

  // Periksa apakah booking ditemukan
  if (!booking) {
   return res.status(404).json({ message: 'Booking not found' });
  }

  // Perbarui kendaraan pada booking
  booking.scheduleId = scheduleId;
  booking.paymentStatus = paymentStatus;
  await booking.save();

  res.json({ message: 'Booking updated successfully', booking });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Controller untuk mendapatkan semua booking
exports.getAllBook = async (req, res) => {
 try {
  // Verifikasi token JWT
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);

  // Periksa apakah pengguna memiliki peran yang sesuai (misalnya, admin)
  if (decodedToken.role.toLowerCase() !== 'admin') {
   return res.status(403).json({ message: 'Unauthorized' });
  }

  // Ambil semua data booking
  const bookings = await Booking.findAll();

  res.json({ bookings });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

// Controller untuk mendapatkan informasi booking yang dilakukan oleh pengguna
exports.getUserBookings = async (req, res) => {
 // Ambil ID pengguna dari token JWT
 const token = req.headers.authorization;
 const decodedToken = jwt.verify(token.slice(7).trim(), configRoles.secret);
 const userId = decodedToken.userId;

 try {
  // Ambil semua data booking yang terkait dengan ID pengguna
  const bookings = await Booking.findAll({ where: { userId } });

  res.json({ bookings });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
 }
};
