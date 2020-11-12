const mongoose = require('mongoose');

const DosageSchema = new mongoose.Schema({
    frequency: Number,
    duration: Number,
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Dosage', DosageSchema);