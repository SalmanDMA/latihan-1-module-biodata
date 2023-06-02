const { User, UserRole, Role } = require('../models');
const configRoles = require('../config/configRoles');
const bcrypt = require('bcryptjs');

const getUserById = async (req, res) => {
 try {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const getAllUsers = async (req, res) => {
 try {
  const users = await User.findAll();
  res.status(200).json(users);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const updateUser = async (req, res) => {
 try {
  const { id } = req.params;
  const { name, email, currentPassword, newPassword } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Periksa kecocokan currentPassword dengan password yang tersimpan di database
  const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordMatch) {
   return res.status(401).json({ message: 'Invalid current password' });
  }

  // Hash password baru
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await user.update({ name, email, password: hashedNewPassword });

  res.status(200).json({ message: 'User updated successfully', user });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const deleteUser = async (req, res) => {
 try {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  await user.destroy();

  res.status(200).json({ message: 'User deleted successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

module.exports = {
 getUserById,
 getAllUsers,
 updateUser,
 deleteUser,
};
