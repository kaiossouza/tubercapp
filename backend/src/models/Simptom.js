const mongoose = require('mongoose');

const SimptomSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Simptom', SimptomSchema);