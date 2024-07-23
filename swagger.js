const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Restaurant Management System API',
            version: '1.0.0',
            description: 'API documentation for the Restaurant Management System',
        },
        servers: [
            {
                url: 'https://restaurantmanagementbackend-yxcf.onrender.com',
            },
        ],
        components: {
            schemas: {
                Customer: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'phoneNumber', 'email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the customer',
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name of the customer',
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the customer',
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'Phone number of the customer',
                        },
                        email: {
                            type: 'string',
                            description: 'Email address of the customer',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a1',
                        firstName: 'John',
                        lastName: 'Doe',
                        phoneNumber: '1234567890',
                        email: 'john.doe@example.com',
                    },
                },
                Employee: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'position', 'phoneNumber', 'email', 'hireDate'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the employee',
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name of the employee',
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the employee',
                        },
                        position: {
                            type: 'string',
                            description: 'Position of the employee',
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'Phone number of the employee',
                        },
                        email: {
                            type: 'string',
                            description: 'Email address of the employee',
                        },
                        hireDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Hire date of the employee',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a2',
                        firstName: 'Jane',
                        lastName: 'Doe',
                        position: 'Manager',
                        phoneNumber: '1234567890',
                        email: 'jane.doe@example.com',
                        hireDate: '2022-01-01',
                    },
                },
                Table: {
                    type: 'object',
                    required: ['tableNumber', 'seatingCapacity', 'status'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the table',
                        },
                        tableNumber: {
                            type: 'number',
                            description: 'The table number',
                        },
                        seatingCapacity: {
                            type: 'number',
                            description: 'The seating capacity of the table',
                        },
                        status: {
                            type: 'string',
                            description: 'The status of the table (e.g., Available, Occupied)',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a3',
                        tableNumber: 1,
                        seatingCapacity: 4,
                        status: 'Available',
                    },
                },
                Reservation: {
                    type: 'object',
                    required: ['customer', 'table', 'reservationDate', 'numberOfGuests'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the reservation',
                        },
                        customer: {
                            type: 'string',
                            description: 'The ID of the customer',
                        },
                        table: {
                            type: 'string',
                            description: 'The ID of the table',
                        },
                        reservationDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date and time of the reservation',
                        },
                        numberOfGuests: {
                            type: 'number',
                            description: 'The number of guests for the reservation',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a4',
                        customer: '5f8f8c44b54764421b7156a1',
                        table: '5f8f8c44b54764421b7156a3',
                        reservationDate: '2022-01-01T12:00:00Z',
                        numberOfGuests: 4,
                    },
                },
                Order: {
                    type: 'object',
                    required: ['table', 'employee', 'orderDate', 'totalAmount'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the order',
                        },
                        table: {
                            type: 'string',
                            description: 'The ID of the table',
                        },
                        employee: {
                            type: 'string',
                            description: 'The ID of the employee',
                        },
                        orderDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date and time of the order',
                        },
                        totalAmount: {
                            type: 'number',
                            description: 'The total amount of the order',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a5',
                        table: '5f8f8c44b54764421b7156a3',
                        employee: '5f8f8c44b54764421b7156a2',
                        orderDate: '2022-01-01T12:00:00Z',
                        totalAmount: 100.00,
                    },
                },
                OrderItem: {
                    type: 'object',
                    required: ['order', 'menuItem', 'quantity', 'price'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the order item',
                        },
                        order: {
                            type: 'string',
                            description: 'The ID of the order',
                        },
                        menuItem: {
                            type: 'string',
                            description: 'The ID of the menu item',
                        },
                        quantity: {
                            type: 'number',
                            description: 'The quantity of the menu item',
                        },
                        price: {
                            type: 'number',
                            description: 'The price of the menu item',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a6',
                        order: '5f8f8c44b54764421b7156a5',
                        menuItem: '5f8f8c44b54764421b7156a7',
                        quantity: 2,
                        price: 12.99,
                    },
                },
                MenuItem: {
                    type: 'object',
                    required: ['name', 'description', 'price', 'category'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the menu item',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the menu item',
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the menu item',
                        },
                        price: {
                            type: 'number',
                            description: 'The price of the menu item',
                        },
                        category: {
                            type: 'string',
                            description: 'The category of the menu item',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a7',
                        name: 'Pasta',
                        description: 'Delicious pasta with tomato sauce',
                        price: 12.99,
                        category: 'Main Course',
                    },
                },
                Supplier: {
                    type: 'object',
                    required: ['name', 'contactName', 'phoneNumber', 'email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the supplier',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the supplier',
                        },
                        contactName: {
                            type: 'string',
                            description: 'The contact name of the supplier',
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'The phone number of the supplier',
                        },
                        email: {
                            type: 'string',
                            description: 'The email address of the supplier',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a8',
                        name: 'Supplier A',
                        contactName: 'Alice',
                        phoneNumber: '1234567890',
                        email: 'alice@example.com',
                    },
                },
                Inventory: {
                    type: 'object',
                    required: ['menuItem', 'supplier', 'quantity', 'lastUpdated'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated ID of the inventory item',
                        },
                        menuItem: {
                            type: 'string',
                            description: 'The ID of the menu item',
                        },
                        supplier: {
                            type: 'string',
                            description: 'The ID of the supplier',
                        },
                        quantity: {
                            type: 'number',
                            description: 'The quantity of the menu item in stock',
                        },
                        lastUpdated: {
                            type: 'string',
                            format: 'date',
                            description: 'The date the inventory was last updated',
                        },
                    },
                    example: {
                        _id: '5f8f8c44b54764421b7156a9',
                        menuItem: '5f8f8c44b54764421b7156a7',
                        supplier: '5f8f8c44b54764421b7156a8',
                        quantity: 100,
                        lastUpdated: '2022-01-01',
                    },
                },
                User: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                      _id: {
                        type: 'string',
                        description: 'The auto-generated ID of the user',
                      },
                      username: {
                        type: 'string',
                        description: 'The username of the user',
                      },
                      password: {
                        type: 'string',
                        description: 'The password of the user',
                      },
                    },
                    example: {
                      _id: '5f8f8c44b54764421b7156b0',
                      username: 'testuser',
                      password: 'password123',
                    },
                  },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
