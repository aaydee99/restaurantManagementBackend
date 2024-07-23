const Supplier = require('../models/supplier');

// Get all suppliers
exports.getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        next(err);
    }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        next(err);
    }
};

// Add a new supplier
exports.addSupplier = async (req, res, next) => {
    const supplier = new Supplier({
        name: req.body.name,
        contactName: req.body.contactName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });

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
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

        supplier.name = req.body.name;
        supplier.contactName = req.body.contactName;
        supplier.phoneNumber = req.body.phoneNumber;
        supplier.email = req.body.email;

        const updatedSupplier = await supplier.save();
        res.json(updatedSupplier);
    } catch (err) {
        next(err);
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

        await supplier.remove();
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        next(err);
    }
};
