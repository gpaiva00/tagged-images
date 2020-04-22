const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: { type: Object, required: true },
  tags: [String],
  selected: { type: Boolean, default: false }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Images', ImageSchema);