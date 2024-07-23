const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hireDate: { type: Date, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
