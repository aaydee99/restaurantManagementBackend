const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Retrieve a list of menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: A list of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 */
router.get('/', menuController.getAllMenuItems);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Retrieve a single menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: A single menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 */
router.get('/:id', menuController.getMenuItemById);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: The created menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request
 */
router.post('/', menuController.addMenuItem);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update an existing menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: The updated menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 */
router.put('/:id', menuController.updateMenuItem);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted
 *       404:
 *         description: Menu item not found
 */
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
