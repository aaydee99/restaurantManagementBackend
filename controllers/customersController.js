const Customer = require('../models/customer');

// Get all customers
exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        next(err);
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

// Add a new customer
exports.addCustomer = async (req, res, next) => {
    const customer = new Customer(req.body);
    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        next(err);
    }
};

// Update a customer
exports.updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        next(err);
    }
};
