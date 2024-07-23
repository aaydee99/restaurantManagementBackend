const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tablesController');

router.get('/', tablesController.getAllTables);
router.get('/:id', tablesController.getTableById);
router.post('/', tablesController.addTable);
router.put('/:id', tablesController.updateTable);
router.delete('/:id', tablesController.deleteTable);

module.exports = router;
