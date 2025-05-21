const http = require('http');
const fs = require('fs').promises;

const database = process.argv[2];

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    fs.readFile(database, 'utf-8')
      .then((data) => {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const students = lines.slice(1).map(line => line.split(','));

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

        res.end(output);
      })
      .catch(() => {
        res.end('Cannot load the database\n');
      });
  } else {
    res.writeHead(404);
    res.end();
  }
});

app.listen(1245);
module.exports = app;
