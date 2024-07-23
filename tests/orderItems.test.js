const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Order Items API', () => {
    let orderItemId;
    let orderId;
    let menuItemId;

    beforeAll(async () => {
        // Create an order and a menu item to use in order item tests
        const employee = await request(app)
            .post('/employees')
            .send({
                firstName: 'John',
                lastName: 'Smith',
                position: 'Manager',
                phoneNumber: '1234567890',
                email: 'john.smith@example.com',
                hireDate: '2022-01-01'
            });
        const employeeId = employee.body._id;

        const table = await request(app)
            .post('/tables')
            .send({
                tableNumber: 1,
                seatingCapacity: 4,
                status: 'Available'
            });
        const tableId = table.body._id;

        const order = await request(app)
            .post('/orders')
            .send({
                table: tableId,
                employee: employeeId,
                orderDate: '2022-01-01T12:00:00Z',
                totalAmount: 100.00
            });
        orderId = order.body._id;

        const menuItem = await request(app)
            .post('/menu')
            .send({
                name: 'Pasta',
                description: 'Delicious pasta',
                price: 12.99,
                category: 'Main Course'
            });
        menuItemId = menuItem.body._id;
    });

    it('should create a new order item', async () => {
        const res = await request(app)
            .post('/orderItems')
            .send({
                order: orderId,
                menuItem: menuItemId,
                quantity: 2,
                price: 12.99
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        orderItemId = res.body._id;
    });

    it('should fetch all order items', async () => {
        const res = await request(app).get('/orderItems');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single order item by ID', async () => {
        const res = await request(app).get(`/orderItems/${orderItemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(orderItemId);
    });

    it('should update an order item', async () => {
        const res = await request(app)
            .put(`/orderItems/${orderItemId}`)
            .send({
                order: orderId,
                menuItem: menuItemId,
                quantity: 3,
                price: 13.99
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('quantity', 3);
    });

    it('should delete an order item', async () => {
        const res = await request(app).delete(`/orderItems/${orderItemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Order item deleted');
    });
});
