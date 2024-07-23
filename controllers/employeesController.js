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
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        hireDate: req.body.hireDate
    });

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
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.position = req.body.position;
        employee.phoneNumber = req.body.phoneNumber;
        employee.email = req.body.email;
        employee.hireDate = req.body.hireDate;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        next(err);
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        await employee.remove();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        next(err);
    }
};
