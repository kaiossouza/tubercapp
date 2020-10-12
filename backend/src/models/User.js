const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  nasc: Date,
  email: String,
  gender: Number,
  role: Number,
  canSendNews: Boolean,
  canNotify: Boolean,
  password: String,
  picture: String,
  treatmentStart: Date,
  treatmentDuration: Number
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.virtual('picture_url').get(function() {
  return `http://localhost:3333/files/${this.picture}`
})

module.exports = mongoose.model('User', UserSchema);