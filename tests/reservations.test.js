const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Reservations API', () => {
    let reservationId;
    let customerId;
    let tableId;

    beforeAll(async () => {
        // Create a customer and a table to use in reservation tests
        const customer = await request(app)
            .post('/customers')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                email: 'john.doe@example.com'
            });
        customerId = customer.body._id;

        const table = await request(app)
            .post('/tables')
            .send({
                tableNumber: 1,
                seatingCapacity: 4,
                status: 'Available'
            });
        tableId = table.body._id;
    });

    it('should create a new reservation', async () => {
        const res = await request(app)
            .post('/reservations')
            .send({
                customer: customerId,
                table: tableId,
                reservationDate: '2022-01-01T12:00:00Z',
                numberOfGuests: 4
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        reservationId = res.body._id;
    });

    it('should fetch all reservations', async () => {
        const res = await request(app).get('/reservations');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single reservation by ID', async () => {
        const res = await request(app).get(`/reservations/${reservationId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(reservationId);
    });

    it('should update a reservation', async () => {
        const res = await request(app)
            .put(`/reservations/${reservationId}`)
            .send({
                customer: customerId,
                table: tableId,
                reservationDate: '2022-02-01T12:00:00Z',
                numberOfGuests: 6
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('numberOfGuests', 6);
    });

    it('should delete a reservation', async () => {
        const res = await request(app).delete(`/reservations/${reservationId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Reservation deleted');
    });
});
