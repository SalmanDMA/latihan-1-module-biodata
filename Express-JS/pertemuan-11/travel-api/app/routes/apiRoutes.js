// apiRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const destinationController = require('../controllers/destinationController');

const router = express.Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route to create a booking
router.post('/bookings', authController.checkUserRole, bookingController.createBooking);

// Route to cancel a booking
router.delete('/bookings/:bookingId', authController.checkAdmin, bookingController.cancelBooking);

// Route to update a booking
router.put('/bookings/:bookingId', authController.checkUserRole, bookingController.updateBooking);

// Route to get bookings by user
router.get('/bookings/user', authController.checkUserRole, userController.getUserBookings);

// Route to get all bookings
router.get('/bookings', authController.checkAdmin, bookingController.getAllBook);

// Route untuk mendapatkan daftar semua jadwal perjalanan
router.get('/schedules', authController.verifyToken, scheduleController.getAllSchedules);

// Route untuk mendapatkan daftar semua destinasi wisata
router.get('/destinations', authController.verifyToken, destinationController.getAllDestinations);

module.exports = router;
