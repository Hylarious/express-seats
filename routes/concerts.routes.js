const randomID = require('@hylarious/package-id')
const express = require('express');
const router = express.Router();
const { db } = require('../db.js');

router.route('/concerts').get((req, res) => {
    // console.log(db)
    res.json(db.concerts)
});

router.route('/concerts/:id').get((req, res) => {
    res.send(db.concerts.find(concert => concert.id == req.params.id))
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body
    const newTestimonial = { id: randomID(5), performer, genre, price, day, image };
    db.concerts.push(newTestimonial);
    res.json(db.concerts)
})

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body
    res.json(db.concerts.map(concert => (concert.id == req.params.id ? { id:concert.id, performer, genre, price, day, image} : concert)))
})

router.route('/concerts/:id').delete((req, res) => {
    res.json(db.concerts.filter(concert => concert.id != req.params.id))
})

module.exports = router;