const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    date: Date,
    feedback: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    simptoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Simptom'
    }]
});

module.exports = mongoose.model('Diary', DiarySchema);