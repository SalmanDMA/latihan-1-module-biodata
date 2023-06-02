const { Order } = require('../models');

const getOrders = async (req, res) => {
 try {
  const orders = await Order.findAll();
  res.status(200).json({ orders });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const getOrderById = async (req, res) => {
 try {
  const { orderId, userId } = req.params;

  const order = await Order.findByPk(orderId);

  if (!order) {
   return res.status(404).json({ message: 'Order not found' });
  }

  const parsedUserId = parseInt(userId);
  if (order.userId !== parsedUserId) {
   return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ order });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const createOrder = async (req, res) => {
 try {
  const { status, name, qty, totalAmount } = req.body;
  const userId = req.user.id;
  const order = await Order.create({ userId, status, name, qty, totalAmount });
  res.status(201).json({ order });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const updateOrder = async (req, res) => {
 try {
  const { orderId, userId } = req.params;
  const { status, name, qty, totalAmount } = req.body;
  const order = await Order.findByPk(orderId);
  if (!order) {
   return res.status(404).json({ message: 'Order not found' });
  }
  const parsedUserId = parseInt(userId);
  if (order.userId !== parsedUserId) {
   return res.status(404).json({ message: 'User not found' });
  }
  order.status = status;
  order.name = name;
  order.qty = qty;
  order.totalAmount = totalAmount;
  await order.save();
  res.status(200).json({ order });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

const deleteOrder = async (req, res) => {
 try {
  const { orderId, userId } = req.params;
  const order = await Order.findByPk(orderId);
  if (!order) {
   return res.status(404).json({ message: 'Order not found' });
  }
  const parsedUserId = parseInt(userId);
  if (order.userId !== parsedUserId) {
   return res.status(404).json({ message: 'User not found' });
  }
  await order.destroy();
  res.status(200).json({ message: 'Order deleted successfully' });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
 }
};

module.exports = {
 getOrders,
 getOrderById,
 createOrder,
 updateOrder,
 deleteOrder,
};
