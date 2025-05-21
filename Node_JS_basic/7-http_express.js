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

      const groups = { CS: [], SWE: [] };
      students.forEach((line) => {
        const fields = line.split(',');
        const firstname = fields[0];
        const field = fields[fields.length - 1];
        if (groups[field]) groups[field].push(firstname);
      });

      let summary = `Number of students: ${students.length}\n`;
      summary += `Number of students in CS: ${groups.CS.length}. List: ${groups.CS.join(', ')}\n`;
      summary += `Number of students in SWE: ${groups.SWE.length}. List: ${groups.SWE.join(', ')}`;
      resolve(summary);
    });
  });
}

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!\n');
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
