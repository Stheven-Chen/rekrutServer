const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: String,
  pass: String,
  user: String
}, {collection :'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;
