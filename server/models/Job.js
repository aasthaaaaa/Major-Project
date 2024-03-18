import User from './User';

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    filename: String,
    salary: Number,
    location: String,
    postingDate: Date,
    expringDate: Date,
    experience: Number,
    education: Number,
    placed: String,
    candidates: [User],
    requirements: [String],
    benefits: [String]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;