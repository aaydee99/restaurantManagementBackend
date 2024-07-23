const Inventory = require('../models/inventory');

// Get all inventory items
exports.getAllInventoryItems = async (req, res, next) => {
    try {
        const inventoryItems = await Inventory.find().populate('menuItem supplier');
        res.json(inventoryItems);
    } catch (err) {
        next(err);
    }
};

// Get an inventory item by ID
exports.getInventoryItemById = async (req, res, next) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id).populate('menuItem supplier');
        if (!inventoryItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.json(inventoryItem);
    } catch (err) {
        next(err);
    }
};

// Add a new inventory item
exports.addInventoryItem = async (req, res, next) => {
    const inventoryItem = new Inventory(req.body);
    try {
        const newInventoryItem = await inventoryItem.save();
        res.status(201).json(newInventoryItem);
    } catch (err) {
        next(err);
    }
};

// Update an inventory item
exports.updateInventoryItem = async (req, res, next) => {
    try {
        const inventoryItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!inventoryItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.json(inventoryItem);
    } catch (err) {
        next(err);
    }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res, next) => {
    try {
        const inventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventoryItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.json({ message: 'Inventory item deleted' });
    } catch (err) {
        next(err);
    }
};
