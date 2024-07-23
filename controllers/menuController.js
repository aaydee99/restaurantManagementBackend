const MenuItem = require('../models/menuItem');

// Get all menu items
exports.getAllMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        next(err);
    }
};

// Get a menu item by ID
exports.getMenuItemById = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json(menuItem);
    } catch (err) {
        next(err);
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res, next) => {
    const menuItem = new MenuItem(req.body);
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        next(err);
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json(menuItem);
    } catch (err) {
        next(err);
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        next(err);
    }
};
