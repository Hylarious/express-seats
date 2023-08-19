const randomID = require('@hylarious/package-id')
const express = require('express');

const router = express.Router();
const { db } = require('../db.js');

router.route('/seats').get((req, res) => {
    // console.log(db)
    res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => {
    res.send(db.seats.find(seat => seat.id == req.params.id))
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body
    if(db.seats.some(item => item.seat == seat && item.day == day)) {
        res.status(409).json({ message: "The slot is already taken..." }
)
    } else {
        const newSeats = { id: randomID(5), day, seat, client, email };
        db.seats.push(newSeats);
        res.json(db.seats)
        req.io.emit('seatsUpdated', db.seats)
    }
})

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body
    res.json(db.seats.map(s => (s.id == req.params.id ? { id:s.id, day, seat, client, email} : s)))
})

router.route('/seats/:id').delete((req, res) => {
    res.json(db.seats.filter(seat => seat.id != req.params.id))
})

module.exports = router;