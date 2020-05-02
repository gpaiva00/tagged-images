const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = model('Users', UserSchema);