const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tablesController');

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: Table management
 */

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Retrieve a list of tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: A list of tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 */
router.get('/', tablesController.getAllTables);

/**
 * @swagger
 * /tables/{id}:
 *   get:
 *     summary: Retrieve a single table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The table ID
 *     responses:
 *       200:
 *         description: A single table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       404:
 *         description: Table not found
 */
router.get('/:id', tablesController.getTableById);

/**
 * @swagger
 * /tables:
 *   post:
 *     summary: Create a new table
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: The created table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       400:
 *         description: Bad request
 */
router.post('/', tablesController.addTable);

/**
 * @swagger
 * /tables/{id}:
 *   put:
 *     summary: Update an existing table
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       200:
 *         description: The updated table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       404:
 *         description: Table not found
 */
router.put('/:id', tablesController.updateTable);

/**
 * @swagger
 * /tables/{id}:
 *   delete:
 *     summary: Delete a table
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The table ID
 *     responses:
 *       200:
 *         description: Table deleted
 *       404:
 *         description: Table not found
 */
router.delete('/:id', tablesController.deleteTable);

module.exports = router;
