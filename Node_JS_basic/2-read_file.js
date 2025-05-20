const fs = require('fs');

function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const students = lines.slice(1); // en-tête ignoré

    const fields = {};

    for (const student of students) {
      const [firstname, , , field] = student.split(',');
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    }

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      const list = fields[field].join(', ');
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
