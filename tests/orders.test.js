const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

jest.setTimeout(30000); // 30 seconds timeout for all tests

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Orders API', () => {
    let orderId;
    let employeeId;
    let tableId;

    beforeAll(async () => {
        // Create an employee and a table to use in order tests
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
        employeeId = employee.body._id;

        const table = await request(app)
            .post('/tables')
            .send({
                tableNumber: 1,
                seatingCapacity: 4,
                status: 'Available'
            });
        tableId = table.body._id;
    });

    it('should create a new order', async () => {
        const res = await request(app)
            .post('/orders')
            .send({
                table: tableId,
                employee: employeeId,
                orderDate: '2022-01-01T12:00:00Z',
                totalAmount: 100.00
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        orderId = res.body._id;
    });

    it('should fetch all orders', async () => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single order by ID', async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(orderId);
    });

    it('should update an order', async () => {
        const res = await request(app)
            .put(`/orders/${orderId}`)
            .send({
                table: tableId,
                employee: employeeId,
                orderDate: '2022-02-01T12:00:00Z',
                totalAmount: 150.00
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('totalAmount', 150.00);
    });

    it('should delete an order', async () => {
        const res = await request(app).delete(`/orders/${orderId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Order deleted');
    });
});
