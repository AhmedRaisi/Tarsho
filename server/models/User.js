const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensuring username is unique
    index: true
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
  profilePicture: {
    type: String,
    required: false, // Making it optional
    default: '' // Default value if no picture is provided
  },
  description: {
    type: String,
    required: false // Optional, but useful for full-text search
  },
  usertags: [{
    type: String, // Array of keywords or tags
    required: false
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Array of numbers for longitude and latitude
      index: '2dsphere' // Important for geospatial queries
    }
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

// Geospatial index for location field
UserSchema.index({ location: '2dsphere' });

// Full-text search index
UserSchema.index({ 
  username: 'text', 
  name: 'text', 
  description: 'text',
  usertags: 'text'
});

module.exports = mongoose.model('User', UserSchema);
