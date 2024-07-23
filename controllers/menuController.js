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
    const menuItem = new MenuItem({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });

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
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        menuItem.name = req.body.name;
        menuItem.description = req.body.description;
        menuItem.price = req.body.price;
        menuItem.category = req.body.category;

        const updatedMenuItem = await menuItem.save();
        res.json(updatedMenuItem);
    } catch (err) {
        next(err);
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        await menuItem.remove();
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        next(err);
    }
};
