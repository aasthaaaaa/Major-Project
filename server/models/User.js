import Job from './Job';

const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  type: String,
  age: Number,
  experience: Number,
  education: String,
  role: String,
  resume: String,
  linkedin: String,
  placed: String,
  description: String,
  highlights: [String],
  jobs: [Job]
});

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;
