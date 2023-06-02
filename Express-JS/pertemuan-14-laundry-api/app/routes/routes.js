const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();
// Import userController and userRoleController
const userController = require('../controllers/userController');
const userRoleController = require('../controllers/userRoleController');
const roleController = require('../controllers/roleController');
const orderController = require('../controllers/orderController');
const { verifyToken, authorizeAdmin } = require('../controllers/verifyToken');

router.post('/login', login);
router.post('/register', register);

// User routes
router.get('/users', verifyToken, authorizeAdmin, userController.getAllUsers);
router.get('/users/:id', verifyToken, userController.getUserById);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

// User role routes
router.get('/users/:userId/roles', verifyToken, authorizeAdmin, userRoleController.getUserRoles);
router.post('/users/:userId/roles', verifyToken, authorizeAdmin, userRoleController.addUserRole);
router.delete('/users/:userId/roles/:roleId', verifyToken, authorizeAdmin, userRoleController.removeUserRole);
router.put('/users/:userId/roles/:roleId', verifyToken, authorizeAdmin, userRoleController.updateUserRole);

// Routes for Role Controller
router.get('/roles', verifyToken, authorizeAdmin, roleController.getRoles);
router.post('/roles', verifyToken, authorizeAdmin, roleController.createRole);
router.put('/roles/:roleId', verifyToken, authorizeAdmin, roleController.updateRole);
router.delete('/roles/:roleId', verifyToken, authorizeAdmin, roleController.deleteRole);

// Routes for Order Controller
router.get('/orders', verifyToken, authorizeAdmin, orderController.getOrders);
router.get('/orders/:orderId/users/:userId', verifyToken, orderController.getOrderById);
router.post('/orders', verifyToken, orderController.createOrder);
router.put('/orders/:orderId/users/:userId', verifyToken, orderController.updateOrder);
router.delete('/orders/:orderId/users/:userId', verifyToken, orderController.deleteOrder);

module.exports = router;
