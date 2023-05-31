// userController.js

const { Booking, User } = require('../models');

const getUserBookings = async (req, res) => {
 try {
  const userId = req.query.userId;
  console.log(userId);
  const user = await User.findByPk(userId, { include: Booking });
  console.log(user);

  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  res.json({ bookings: user.Bookings });
 } catch (error) {
  console.error('Error retrieving user bookings:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

module.exports = {
 getUserBookings,
};
