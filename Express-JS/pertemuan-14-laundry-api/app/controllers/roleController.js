const { Role, UserRole } = require('../models');
const configRoles = require('../config/configRoles');

const getRoles = async (req, res) => {
 try {
  // Ambil semua role dari database
  const roles = await Role.findAll();

  res.status(200).json({ roles });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const createRole = async (req, res) => {
 try {
  const { name } = req.body;

  // Cek apakah role dengan nama tersebut sudah ada di database
  const existingRole = await Role.findOne({ where: { name } });
  if (existingRole) {
   return res.status(409).json({ message: 'Role already exists' });
  }

  // Buat role baru di database
  const newRole = await Role.create({ name });

  res.status(201).json({ role: newRole });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const updateRole = async (req, res) => {
 try {
  const { roleId } = req.params;
  const { name } = req.body;

  // Cek apakah role dengan ID tersebut ada di database
  const existingRole = await Role.findByPk(roleId);
  if (!existingRole) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Perbarui nama role di database
  existingRole.name = name;
  await existingRole.save();

  res.status(200).json({ role: existingRole });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const deleteRole = async (req, res) => {
 try {
  const { roleId } = req.params;

  // Cek apakah role dengan ID tersebut ada di database
  const existingRole = await Role.findByPk(roleId);
  if (!existingRole) {
   return res.status(404).json({ message: 'Role not found' });
  }

  // Hapus role dari database
  await existingRole.destroy();

  res.status(200).json({ message: 'Role deleted successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

module.exports = {
 getRoles,
 createRole,
 updateRole,
 deleteRole,
};
