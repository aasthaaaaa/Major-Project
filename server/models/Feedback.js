import Job from './Job';

const mongoose = require('mongoose');

// Define a schema
const feedbackSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  text: String
});

// Create a model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
