const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
    return;
  }

  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      await countStudents(process.argv[2]);
      res.end();
    } catch (err) {
      res.end('Cannot load the database\n');
    }
    return;
  }

  res.statusCode = 404;
  res.end('Not found\n');
});

app.listen(1245);

module.exports = app;
