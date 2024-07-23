const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Menu API', () => {
    let menuItemId;

    it('should create a new menu item', async () => {
        const res = await request(app)
            .post('/menu')
            .send({
                name: 'Pasta',
                description: 'Delicious pasta',
                price: 12.99,
                category: 'Main Course'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        menuItemId = res.body._id;
    }, 30000);

    it('should fetch all menu items', async () => {
        const res = await request(app).get('/menu');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single menu item by ID', async () => {
        const res = await request(app).get(`/menu/${menuItemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(menuItemId);
    });

    it('should update a menu item', async () => {
        const res = await request(app)
            .put(`/menu/${menuItemId}`)
            .send({
                name: 'Spaghetti',
                description: 'Delicious spaghetti',
                price: 13.99,
                category: 'Main Course'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Spaghetti');
    });

    it('should delete a menu item', async () => {
        const res = await request(app).delete(`/menu/${menuItemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Menu item deleted');
    });
});
