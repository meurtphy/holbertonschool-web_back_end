const express = require('express');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line);
      const students = lines.slice(1);
      const fields = {};

      for (const student of students) {
        const [firstname, , , field] = student.split(',');
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      const report = [];
      report.push(`Number of students: ${students.length}`);
      for (const [field, names] of Object.entries(fields)) {
        report.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      resolve(report);
    });
  });
}

const app = express();
const db = process.argv[2];

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  try {
    const lines = await countStudents(db);
    res.status(200).send(`This is the list of our students\n${lines.join('\n')}`);
  } catch (err) {
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245);

module.exports = app;
