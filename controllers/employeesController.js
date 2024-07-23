const Employee = require('../models/employee');

// Get all employees
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        next(err);
    }
};

// Add a new employee
exports.addEmployee = async (req, res, next) => {
    const employee = new Employee(req.body);
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        next(err);
    }
};

// Update an employee
exports.updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        next(err);
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        next(err);
    }
};
