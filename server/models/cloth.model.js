const { model, Schema } = require('mongoose');

// Schema for cloths
const clothSchema = new Schema({
  createdBy: String,
  name: String,
  location:{
    latitude: String,
    longitude: String
  },
  link: String,
  description: String
});

module.exports = model('Cloth', clothSchema, 'cloths');
