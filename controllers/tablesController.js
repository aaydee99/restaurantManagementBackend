const Table = require('../models/table');

// Get all tables
exports.getAllTables = async (req, res, next) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        next(err);
    }
};

// Get a table by ID
exports.getTableById = async (req, res, next) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) return res.status(404).json({ message: 'Table not found' });
        res.json(table);
    } catch (err) {
        next(err);
    }
};

// Add a new table
exports.addTable = async (req, res, next) => {
    const table = new Table(req.body);
    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (err) {
        next(err);
    }
};

// Update a table
exports.updateTable = async (req, res, next) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!table) return res.status(404).json({ message: 'Table not found' });
        res.json(table);
    } catch (err) {
        next(err);
    }
};

// Delete a table
exports.deleteTable = async (req, res, next) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) return res.status(404).json({ message: 'Table not found' });
        res.json({ message: 'Table deleted' });
    } catch (err) {
        next(err);
    }
};
