const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    reservationDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
