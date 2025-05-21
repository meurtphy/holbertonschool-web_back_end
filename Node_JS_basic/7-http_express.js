const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((data) => {
        const lines = data
          .trim()
          .split('\n')
          .filter((line) => line.length > 0);

        const students = lines.slice(1); // Remove header
        if (students.length === 0) {
          throw new Error('Cannot load the database');
        }

        const csStudents = [];
        const sweStudents = [];

        students.forEach((student) => {
          const [firstName, , , field] = student.split(',');
          if (field === 'CS') csStudents.push(firstName);
          if (field === 'SWE') sweStudents.push(firstName);
        });

        const result = `Number of students: ${students.length}\n`
          + `Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\n`
          + `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`;

        resolve(result);
      })
      .catch(() => reject(new Error('Cannot load the database')));
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const dbFile = process.argv[2];
    const data = await countStudents(dbFile);
    res.send(`This is the list of our students\n${data}`);
  } catch (error) {
    res.send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(port);

module.exports = app;