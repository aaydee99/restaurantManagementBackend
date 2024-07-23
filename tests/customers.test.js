const request = require('supertest');
const app = require('../server'); // Adjust the path as needed
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Customers API', () => {
    let customerId;

    it('should create a new customer', async () => {
        const res = await request(app)
            .post('/customers')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                email: 'john.doe@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        customerId = res.body._id;
    });

    it('should fetch all customers', async () => {
        const res = await request(app).get('/customers');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single customer by ID', async () => {
        const res = await request(app).get(`/customers/${customerId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(customerId);
    });

    it('should update a customer', async () => {
        const res = await request(app)
            .put(`/customers/${customerId}`)
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: '0987654321',
                email: 'jane.doe@example.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('firstName', 'Jane');
    });

    it('should delete a customer', async () => {
        const res = await request(app).delete(`/customers/${customerId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Customer deleted');
    });
});
