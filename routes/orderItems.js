const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');

router.get('/', orderItemsController.getAllOrderItems);
router.get('/:id', orderItemsController.getOrderItemById);
router.post('/', orderItemsController.addOrderItem);
router.put('/:id', orderItemsController.updateOrderItem);
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;
