const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.get('/', reservationsController.getAllReservations);
router.get('/:id', reservationsController.getReservationById);
router.post('/', reservationsController.addReservation);
router.put('/:id', reservationsController.updateReservation);
router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;
