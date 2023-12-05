const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  provider: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  servicename: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  availability: { 
    type: Boolean, 
    default: true 
  },
  requirements: { 
    type: String,
    required: false 
  }, // Optional field for any special requirements
});

module.exports = mongoose.model('Service', ServiceSchema);
