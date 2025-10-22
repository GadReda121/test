const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true }
});

module.exports = mongoose.model('Course', modelSchema);
