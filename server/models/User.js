const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensuring username is unique
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensuring email is unique
  },
  name: {
    type: String,
    required: false // Name is not required
    // unique: false is default and hence not needed explicitly
  },
  role: {
    type: String,
    enum: ['client', 'provider'],
    required: true
  },
  rating: {
    type: Number,
    default: 3,
    min: 0,
    max: 5
  },
  contactNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },


  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],


});

module.exports = mongoose.model('User', UserSchema);
