const OrderItem = require('../models/orderItem');

// Get all order items
exports.getAllOrderItems = async (req, res, next) => {
    try {
        const orderItems = await OrderItem.find().populate('order menuItem');
        res.json(orderItems);
    } catch (err) {
        next(err);
    }
};

// Get an order item by ID
exports.getOrderItemById = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id).populate('order menuItem');
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
        res.json(orderItem);
    } catch (err) {
        next(err);
    }
};

// Add a new order item
exports.addOrderItem = async (req, res, next) => {
    const orderItem = new OrderItem(req.body);
    try {
        const newOrderItem = await orderItem.save();
        res.status(201).json(newOrderItem);
    } catch (err) {
        next(err);
    }
};

// Update an order item
exports.updateOrderItem = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
        res.json(orderItem);
    } catch (err) {
        next(err);
    }
};

// Delete an order item
exports.deleteOrderItem = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
        res.json({ message: 'Order item deleted' });
    } catch (err) {
        next(err);
    }
};
