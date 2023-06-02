const { User, UserRole, Role } = require('../models');
const configRoles = require('../config/configRoles');

const getUserRoles = async (req, res) => {
 try {
  const { userId } = req.params;

  // Cek apakah user dengan ID tersebut ada di database
  const user = await User.findByPk(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Ambil semua user roles yang terkait dengan user
  const userRoles = await UserRole.findAll({ where: { userId } });

  // Jika tidak ada user roles yang ditemukan
  if (userRoles.length === 0) {
   return res.status(404).json({ message: 'User roles not found' });
  }

  // Ambil detail role untuk setiap user role
  const roles = await Promise.all(
   userRoles.map(async (userRole) => {
    const role = await Role.findByPk(userRole.roleId);
    return {
     id: role.id,
     name: role.name,
    };
   })
  );

  res.status(200).json({ userRoles: roles });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const addUserRole = async (req, res) => {
 try {
  const { userId, roleId } = req.body;

  // Cek apakah user dengan ID tersebut ada di database
  const user = await User.findByPk(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Cek apakah role dengan ID tersebut ada di database
  const role = await Role.findByPk(roleId);
  if (!role) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Cek apakah user role sudah ada sebelumnya
  const existingUserRole = await UserRole.findOne({ where: { userId, roleId } });
  if (existingUserRole) {
   return res.status(409).json({ message: 'User role already exists' });
  }

  // Tambahkan user role ke database
  await UserRole.create({ userId, roleId });

  res.status(201).json({ message: 'User role added successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const removeUserRole = async (req, res) => {
 try {
  const { userId, roleId } = req.body;

  // Cek apakah user dengan ID tersebut ada di database
  const user = await User.findByPk(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Cek apakah role dengan ID tersebut ada di database
  const role = await Role.findByPk(roleId);
  if (!role) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Cek apakah user role ada di database
  const userRole = await UserRole.findOne({ where: { userId, roleId } });
  if (!userRole) {
   return res.status(404).json({ message: 'User role not found' });
  }

  // Hapus user role dari database
  await userRole.destroy();

  res.status(200).json({ message: 'User role removed successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const updateUserRole = async (req, res) => {
 try {
  const { userId, roleId } = req.body;

  // Cek apakah user dengan ID tersebut ada di database
  const user = await User.findByPk(userId);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Cek apakah role dengan ID tersebut ada di database
  const role = await Role.findByPk(roleId);
  if (!role) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Cek apakah user role ada di database
  const userRole = await UserRole.findOne({ where: { userId, roleId } });
  if (!userRole) {
   return res.status(404).json({ message: 'User role not found' });
  }

  // Lakukan pembaruan user role di database
  await userRole.update({ userId, roleId });

  res.status(200).json({ message: 'User role updated successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

module.exports = {
 getUserRoles,
 addUserRole,
 removeUserRole,
 updateUserRole,
};
