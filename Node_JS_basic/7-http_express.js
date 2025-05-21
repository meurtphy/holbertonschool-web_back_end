const express = require('express');
const fs = require('fs').promises;

const app = express();
const database = process.argv[2]; // le CSV passé en argument

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const data = await fs.readFile(database, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));

    const fields = {};
    for (const student of students) {
      const [firstname, , , field] = student;
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    }

    let output = 'This is the list of our students\n';
    output += `Number of students: ${students.length}\n`;

    for (const field in fields) {
      output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
    }

    res.type('text/plain').send(output);
  } catch (err) {
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245);
module.exports = app;
