const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

module.exports =  mongoose.model('Tags', TagsSchema);