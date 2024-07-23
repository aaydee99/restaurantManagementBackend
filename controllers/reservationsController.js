const Reservation = require('../models/reservation');

// Get all reservations
exports.getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().populate('customer table');
        res.json(reservations);
    } catch (err) {
        next(err);
    }
};

// Get a reservation by ID
exports.getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('customer table');
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        next(err);
    }
};

// Add a new reservation
exports.addReservation = async (req, res, next) => {
    const reservation = new Reservation(req.body);
    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        next(err);
    }
};

// Update a reservation
exports.updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        next(err);
    }
};

// Delete a reservation
exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json({ message: 'Reservation deleted' });
    } catch (err) {
        next(err);
    }
};
