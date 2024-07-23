const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Employees API', () => {
    let employeeId;

    it('should create a new employee', async () => {
        const res = await request(app)
            .post('/employees')
            .send({
                firstName: 'John',
                lastName: 'Smith',
                position: 'Manager',
                phoneNumber: '1234567890',
                email: 'john.smith@example.com',
                hireDate: '2022-01-01'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        employeeId = res.body._id;
    });

    it('should fetch all employees', async () => {
        const res = await request(app).get('/employees');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single employee by ID', async () => {
        const res = await request(app).get(`/employees/${employeeId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(employeeId);
    });

    it('should update an employee', async () => {
        const res = await request(app)
            .put(`/employees/${employeeId}`)
            .send({
                firstName: 'Jane',
                lastName: 'Smith',
                position: 'Supervisor',
                phoneNumber: '0987654321',
                email: 'jane.smith@example.com',
                hireDate: '2022-02-01'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('firstName', 'Jane');
    });

    it('should delete an employee', async () => {
        const res = await request(app).delete(`/employees/${employeeId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Employee deleted');
    });
});
