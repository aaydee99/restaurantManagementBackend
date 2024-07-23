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
const { protect } = require('./middleware/authMiddleware'); // Add middleware for protecting routes
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// MongoDB connection
connectDB();


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', protect, customersRouter);
app.use('/api/employees', protect, employeesRouter);
app.use('/api/tables', protect, tablesRouter);
app.use('/api/reservations', protect, reservationsRouter);
app.use('/api/orders', protect, ordersRouter);
app.use('/api/orderItems', protect, orderItemsRouter);
app.use('/api/menu', protect, menuRouter);
app.use('/api/suppliers', protect, suppliersRouter);
app.use('/api/inventory', protect, inventoryRouter);

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
