const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
