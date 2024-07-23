const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
