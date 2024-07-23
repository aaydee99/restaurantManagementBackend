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
const setupSwagger = require('./swagger');

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
app.use('/customers', protect, customersRouter);
app.use('/employees', protect, employeesRouter);
app.use('/tables', protect, tablesRouter);
app.use('/reservations', protect, reservationsRouter);
app.use('/orders', protect, ordersRouter);
app.use('/orderItems', protect, orderItemsRouter);
app.use('/menu', protect, menuRouter);
app.use('/suppliers', protect, suppliersRouter);
app.use('/inventory', protect, inventoryRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant Management System');
});

// Error handling middleware
app.use(errorHandler);


setupSwagger(app); // Add this line to setup Swagger


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export the app for testing
