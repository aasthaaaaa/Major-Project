const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
import User from './models/User';
import Feedback from './models/Feedback';
import Job from './models/Job';


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/getJob', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/createJob', upload.single('file'), async (req,res)=>{
  const { name, email, password,type, age ,experience,education,role, linkedIn, placed,description, higlights } = req.body;
  const { resume, pathname } = req.file;
  try {
    // Save file metadata to MongoDB
    const file = new Job({ name, email, password,type, age ,experience,education,role, linkedIn, placed,description, higlights, resume, pathname });
    await file.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/getProfile', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/createProfile', upload.single('file'), async(req, res) => {
  const { title, description, salary, location, postingDate, expiringDate, experience, education, placed,requirements, benefits } = req.body;
  const { filename, pathname } = req.file;
  try {
    // Save file metadata to MongoDB
    const file = new User({title,description, salary,location, postingDate, expiringDate, experience, education, placed,requirements, benefits, filename, pathname });
    await file.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/contact', async(req, res) => {
  const { name, email, text } = req.body;
  try {
    // Save file metadata to MongoDB
    const file = new Job({ name, email, text  });
    await file.save();
    res.status(200).json({ message: 'data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
