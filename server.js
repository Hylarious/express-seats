const express = require('express');
const cors = require('cors')
// const { db } = require('./db.js')

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes.js')
const concertsRoutes = require('./routes/concerts.routes.js')
const seatsRoutes = require('./routes/seats.routes.js')

app.use(cors());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes)
app.use('/', seatsRoutes)

app.get('/', (req, res) => {
  res.send('home');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });

