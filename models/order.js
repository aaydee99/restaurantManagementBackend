const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    orderDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
