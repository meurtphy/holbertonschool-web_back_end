const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!\n');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');
  res.write('This is the list of our students\n');
  try {
    await countStudents(process.argv[2]); // 3-read_file_async fait déjà les logs requis
    res.end();
  } catch (err) {
    res.end('Cannot load the database\n');
  }
});

app.listen(1245);

module.exports = app;
