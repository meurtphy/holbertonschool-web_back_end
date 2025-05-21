const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((l) => l.trim() !== '');
      const students = lines.slice(1); // on ignore l’en-tête

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

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    const dbPath = process.argv[2];
    res.write('This is the list of our students\n');
    try {
      const summary = await countStudents(dbPath);
      res.end(`${summary}\n`);
    } catch (err) {
      res.end('Cannot load the database\n');
    }
  } else {
    res.statusCode = 404;
    res.end('Not found\n');
  }
});

app.listen(1245);
module.exports = app;
