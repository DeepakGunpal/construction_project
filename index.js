const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/route/route.js');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', route);

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname + "public")));


mongoose.connect("mongodb+srv://DeepakGunpal:hdg5NWwcvf2wUDTN@deepakcluster0.hynna.mongodb.net/bhumio", {
    useNewUrlParser: true
}).then(() => app.listen(PORT, () => {
    console.log(`PORT ${PORT} Live`, '🚀')
}))