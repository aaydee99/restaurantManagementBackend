const Order = require('../models/order');

// Get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('table employee');
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// Get an order by ID
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('table employee');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        next(err);
    }
};

// Add a new order
exports.addOrder = async (req, res, next) => {
    const order = new Order({
        table: req.body.table,
        employee: req.body.employee,
        orderDate: req.body.orderDate,
        totalAmount: req.body.totalAmount
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
};

// Update an order
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.table = req.body.table;
        order.employee = req.body.employee;
        order.orderDate = req.body.orderDate;
        order.totalAmount = req.body.totalAmount;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

// Delete an order
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await order.remove();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        next(err);
    }
};
