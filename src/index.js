const express = require('express');
const mongoose = require('mongoose');
const route = require('./route/route.js');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', route);

const corsOptions = {
    origin: 'https://fastidious-gecko-3045db.netlify.app/',
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

mongoose.connect("mongodb+srv://DeepakGunpal:hdg5NWwcvf2wUDTN@deepakcluster0.hynna.mongodb.net/bhumio", {
    useNewUrlParser: true
}).then(() => app.listen(PORT, () => {
    console.log(`PORT ${PORT} Live`, '🚀')
}))