const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: String,
    dose: Number,
    doseUnit: String
});

module.exports = mongoose.model('Medicine', MedicineSchema);