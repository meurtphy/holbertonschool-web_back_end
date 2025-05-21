const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const db = process.argv[2];

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  countStudents(db)
    .then(() => {
      // countStudents fait déjà les console.log(), mais ici on doit renvoyer un format identique
      const data = require('fs').readFileSync(db, 'utf8')
        .split('\n')
        .filter((line) => line.trim() !== '');
      const students = data.slice(1);
      const fields = {};
      for (const student of students) {
        const [firstname, , , field] = student.split(',');
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      let result = 'This is the list of our students';
      result += `\nNumber of students: ${students.length}`;
      for (const [field, names] of Object.entries(fields)) {
        result += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      }

      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send('Cannot load the database');
    });
});

app.listen(1245);

module.exports = app;
