const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory data store
const studentApplications = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, course } = req.body;
  studentApplications.push({ name, email, phone, course });

  res.send(`
    <h2>Thank you, ${name}!</h2>
    <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
    <a href="/admission">Go Back</a>
  `);
});

// Optional: View stored data
app.get('/applications', (req, res) => {
  res.json(studentApplications);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

