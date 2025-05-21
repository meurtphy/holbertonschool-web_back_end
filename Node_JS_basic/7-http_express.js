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

      const lines = data.trim().split('\n').filter((l) => l.trim() !== '');
      const students = lines.slice(1);

      const groups = {};
      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        groups[field] = groups[field] || [];
        groups[field].push(firstname);
      });

      let out = `Number of students: ${students.length}\n`;
      Object.keys(groups).forEach((field) => {
        out += `Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}\n`;
      });

      resolve(out.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!\n');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');
  res.write('This is the list of our students\n');
  try {
    const summary = await countStudents(process.argv[2]);
    res.end(`${summary}\n`);
  } catch (err) {
    res.end('Cannot load the database\n');
  }
});

app.listen(1245);

module.exports = app;
