const mongoose = require('mongoose');

const MedicineRegSchema = new mongoose.Schema({
    date: Date,
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('MedicineReg', MedicineRegSchema);