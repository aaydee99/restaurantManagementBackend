const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');

/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Order item management
 */

/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: Retrieve a list of order items
 *     tags: [Order Items]
 *     responses:
 *       200:
 *         description: A list of order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 */
router.get('/', orderItemsController.getAllOrderItems);

/**
 * @swagger
 * /orderItems/{id}:
 *   get:
 *     summary: Retrieve a single order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: A single order item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found
 */
router.get('/:id', orderItemsController.getOrderItemById);

/**
 * @swagger
 * /orderItems:
 *   post:
 *     summary: Create a new order item
 *     tags: [Order Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: The created order item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request
 */
router.post('/', orderItemsController.addOrderItem);

/**
 * @swagger
 * /orderItems/{id}:
 *   put:
 *     summary: Update an existing order item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: The updated order item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found
 */
router.put('/:id', orderItemsController.updateOrderItem);

/**
 * @swagger
 * /orderItems/{id}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: Order item deleted
 *       404:
 *         description: Order item not found
 */
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;
