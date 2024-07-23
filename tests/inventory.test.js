const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Inventory API', () => {
    let inventoryId;
    let menuItemId;
    let supplierId;

    beforeAll(async () => {
        // Create a menu item and a supplier to use in inventory tests
        const menuItem = await request(app)
            .post('/menu')
            .send({
                name: 'Pasta',
                description: 'Delicious pasta',
                price: 12.99,
                category: 'Main Course'
            });
        menuItemId = menuItem.body._id;

        const supplier = await request(app)
            .post('/suppliers')
            .send({
                name: 'Supplier A',
                contactName: 'Alice',
                phoneNumber: '1234567890',
                email: 'alice@example.com'
            });
        supplierId = supplier.body._id;
    });

    it('should create a new inventory item', async () => {
        const res = await request(app)
            .post('/inventory')
            .send({
                menuItem: menuItemId,
                supplier: supplierId,
                quantity: 100,
                lastUpdated: '2022-01-01T12:00:00Z'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        inventoryId = res.body._id;
    });

    it('should fetch all inventory items', async () => {
        const res = await request(app).get('/inventory');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single inventory item by ID', async () => {
        const res = await request(app).get(`/inventory/${inventoryId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(inventoryId);
    });

    it('should update an inventory item', async () => {
        const res = await request(app)
            .put(`/inventory/${inventoryId}`)
            .send({
                menuItem: menuItemId,
                supplier: supplierId,
                quantity: 150,
                lastUpdated: '2022-02-01T12:00:00Z'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('quantity', 150);
    });

    it('should delete an inventory item', async () => {
        const res = await request(app).delete(`/inventory/${inventoryId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Inventory item deleted');
    });
});
