const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

app.use(helmet());
app.use(cors());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect(`mongodb+srv://karolinahyla1:${process.env.DB_PASS}@@cluster0.a26dxzg.mongodb.net/NewWabeDB?retryWrites=true&w=majority`, { useNewUrlParser: true,  useUnifiedTopology: true  });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to database')
})

db.on('error', err => console.log('Error' + err))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket) =>{
  console.log('User connected');
});

module.exports = server;



