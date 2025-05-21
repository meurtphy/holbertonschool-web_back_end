const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line);
      const students = lines.slice(1);
      const fields = {};

      for (const student of students) {
        const [firstname, , , field] = student.split(',');
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      let output = `Number of students: ${students.length}`;
      for (const [field, names] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      }

      resolve(output);
    });
  });
}

const app = http.createServer((req, res) => {
  const db = process.argv[2];
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(db)
      .then((report) => {
        res.end(`This is the list of our students\n${report}`);
      })
      .catch((err) => {
        res.end(`Cannot load the database`);
      });
  } else {
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
