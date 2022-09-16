const mongoose = require('mongoose');

const projectId = new mongoose.Schema({
    id: Number,
    seq: Number
});

module.exports = mongoose.model('projectId', projectId);