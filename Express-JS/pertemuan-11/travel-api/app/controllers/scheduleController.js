const { Schedule } = require('../models');

const getAllSchedules = async (req, res) => {
 try {
  const schedules = await Schedule.findAll();
  res.json({ schedules });
 } catch (error) {
  console.error('Error retrieving schedules:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

module.exports = {
 getAllSchedules,
};
