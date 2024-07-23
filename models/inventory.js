const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    quantity: { type: Number, required: true },
    lastUpdated: { type: Date, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
