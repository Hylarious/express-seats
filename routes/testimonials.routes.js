const randomID = require('@hylarious/package-id')
const express = require('express');
const router = express.Router();
const { db } = require('../db.js');

router.route('/testimonials').get((req, res) => {
    // console.log(db)
    res.json(db.testimonials)
});
router.route('/testimonials/random').get((req, res) => {
    const random = Math.floor(Math.random() * db.testimonials.length) 
    res.json(db.testimonials[random])
})

router.route('/testimonials/:id').get((req, res) => {
    res.send(db.testimonials.find(testimony => testimony.id == req.params.id))
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body
    const newTestimonial = { id: randomID(5), author, text };
    db.testimonials.push(newTestimonial);
    res.json(db.testimonials)
})

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body
    res.json(db.testimonials.map(testimony => (testimony.id == req.params.id ? { id:testimony.id, author, text} : testimony)))
})

router.route('/testimonials/:id').delete((req, res) => {
    res.json(db.testimonials.filter(testimony => testimony.id != req.params.id))
})

module.exports = router;