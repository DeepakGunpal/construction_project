const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/route/route.js');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
}).then(() => app.listen(PORT, () => {
    console.log(`PORT ${PORT} Live`, '🚀')
}))