const express = require('express');
const fs = require('fs');

const app = express();

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const cs = [];
      const swe = [];

      for (const line of students) {
        const record = line.split(',');
        const field = record[record.length - 1];
        const firstname = record[0];

        if (field === 'CS') {
          cs.push(firstname);
        } else if (field === 'SWE') {
          swe.push(firstname);
        }
      }

      let result = '';
      result += `Number of students: ${students.length}\n`;
      result += `Number of students in CS: ${cs.length}. List: ${cs.join(', ')}\n`;
      result += `Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`;

      resolve(result);
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!\n'); // ← AJOUT DU \n
});

app.get('/students', async (req, res) => {
  const path = process.argv[2];
  try {
    const studentSummary = await countStudents(path);
    res.set('Content-Type', 'text/plain');
    res.send(`This is the list of our students\n${studentSummary}\n`); // ← AJOUT DU \n FINAL
  } catch (err) {
    res.status(500).send('This is the list of our students\nCannot load the database\n'); // ← AJOUT DU \n
  }
});

app.listen(1245);
module.exports = app;
