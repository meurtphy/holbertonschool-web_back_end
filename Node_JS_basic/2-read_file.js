const fs = require('fs');

function countStudents(path) {
  const data = fs.readFileSync(path, 'utf-8');
  console.log(data);
}

module.exports = countStudents;
