require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const fs = require('fs');

// Routes Import
const nyhederRouter = require('./routes/nyheder.js');
const galleriRouter = require('./routes/galleri.js');
const userRouter = require('./routes/user.js');


// Expres app
const app = express();

// Middleware
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use(express.json());

// Routes
app.use('/nyheder', nyhederRouter);
app.use('/galleri', galleriRouter);
app.use('/user', userRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('tilsluttet til database')
    app.listen(process.env.PORT, () => {
        console.log('lytter til request fra port', process.env.PORT)
    })
})
.catch((err) => {
    console.log(err)
})