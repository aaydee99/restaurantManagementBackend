const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Suppliers API', () => {
    let supplierId;

    it('should create a new supplier', async () => {
        const res = await request(app)
            .post('/suppliers')
            .send({
                name: 'Supplier A',
                contactName: 'Alice',
                phoneNumber: '1234567890',
                email: 'alice@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        supplierId = res.body._id;
    });

    it('should fetch all suppliers', async () => {
        const res = await request(app).get('/suppliers');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single supplier by ID', async () => {
        const res = await request(app).get(`/suppliers/${supplierId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(supplierId);
    });

    it('should update a supplier', async () => {
        const res = await request(app)
            .put(`/suppliers/${supplierId}`)
            .send({
                name: 'Supplier B',
                contactName: 'Bob',
                phoneNumber: '0987654321',
                email: 'bob@example.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Supplier B');
    });

    it('should delete a supplier', async () => {
        const res = await request(app).delete(`/suppliers/${supplierId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Supplier deleted');
    });
});
