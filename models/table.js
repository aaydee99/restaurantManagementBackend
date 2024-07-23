const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    seatingCapacity: { type: Number, required: true },
    status: { type: String, required: true }
});

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
