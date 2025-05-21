const express = require('express');
const fs = require('fs').promises;

const app = express();

async function buildStudentSummary(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((l) => l.trim() !== '').slice(1);

    const groups = {};
    lines.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      groups[field] = groups[field] || [];
      groups[field].push(firstname);
    });

    const total = lines.length;
    let out = `Number of students: ${total}\n`;
    Object.entries(groups).forEach(([field, list]) => {
      out += `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`;
    });

    return out.trim();
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');
  res.write('This is the list of our students\n');
  try {
    const summary = await buildStudentSummary(process.argv[2]);
    res.end(summary);
  } catch (err) {
    res.end(err.message);
  }
});

app.listen(1245);
module.exports = app;

