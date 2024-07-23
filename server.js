// Import routes
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const customersRouter = require('./routes/customers');
const employeesRouter = require('./routes/employees');
const tablesRouter = require('./routes/tables');
const reservationsRouter = require('./routes/reservations');
const ordersRouter = require('./routes/orders');
const orderItemsRouter = require('./routes/orderItems');
const menuRouter = require('./routes/menu');
const suppliersRouter = require('./routes/suppliers');
const inventoryRouter = require('./routes/inventory');
const { connectDB } = require('./utils/db');
const {specs, swaggerUi} = require('./swagger');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();


// Use routes
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/tables', tablesRouter);
app.use('/reservations', reservationsRouter);
app.use('/orders', ordersRouter);
app.use('/orderItems', orderItemsRouter);
app.use('/menu', menuRouter);
app.use('/suppliers', suppliersRouter);
app.use('/inventory', inventoryRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant Management System');
});

// Error handling middleware
app.use(errorHandler);


app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs),
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export the app for testing
