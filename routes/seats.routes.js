const randomID = require('@hylarious/package-id')
const express = require('express');
const router = express.Router();
const { db } = require('../db.js');

router.route('/seats').get((req, res) => {
    console.log(db)
    res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => {
if (req.params.id == 'random') {
    const random = Math.floor(Math.random() * db.seats.length) 
    res.json(db.seats[random])
}
else { res.send(db.seats.find(seat => seat.id == req.params.id))}
});

router.route('/seats').post((req, res) => {
const { day, seat, client, email } = req.body
const newTestimonial = { id: randomID(5), day, seat, client, email };
db.seats.push(newTestimonial);
res.json(db.seats)
})

router.route('/seats/:id').put((req, res) => {
const { day, seat, client, email } = req.body
res.json(db.seats.map(seat => (seat.id == req.params.id ? { id:seat.id, day, seat, client, email} : seat)))
})

router.route('/seats/:id').delete((req, res) => {
res.json(db.seats.filter(seat => seat.id != req.params.id))
})

module.exports = router;