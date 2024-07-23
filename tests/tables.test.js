const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Tables API', () => {
    let tableId;

    it('should create a new table', async () => {
        const res = await request(app)
            .post('/tables')
            .send({
                tableNumber: 1,
                seatingCapacity: 4,
                status: 'Available'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        tableId = res.body._id;
    });

    it('should fetch all tables', async () => {
        const res = await request(app).get('/tables');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single table by ID', async () => {
        const res = await request(app).get(`/tables/${tableId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(tableId);
    });

    it('should update a table', async () => {
        const res = await request(app)
            .put(`/tables/${tableId}`)
            .send({
                tableNumber: 2,
                seatingCapacity: 6,
                status: 'Occupied'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('tableNumber', 2);
    });

    it('should delete a table', async () => {
        const res = await request(app).delete(`/tables/${tableId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Table deleted');
    });
});
