const { Destination } = require('../models');

const getAllDestinations = async (req, res) => {
 try {
  const destinations = await Destination.findAll();

  res.json({ destinations });
 } catch (error) {
  console.error('Error retrieving destinations:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};

module.exports = {
 getAllDestinations,
};
