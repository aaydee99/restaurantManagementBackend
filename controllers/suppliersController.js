const Supplier = require('../models/supplier');

// Get all suppliers
exports.getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find().exec();
        res.json(suppliers);
    } catch (err) {
        next(err);
    }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id).exec();
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        next(err);
    }
};

// Add a new supplier
exports.addSupplier = async (req, res, next) => {
    const supplier = new Supplier(req.body);
    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (err) {
        next(err);
    }
};

// Update a supplier
exports.updateSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        next(err);
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id).exec();
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        next(err);
    }
};
