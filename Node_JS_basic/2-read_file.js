const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n').filter((l) => l.trim() !== '');
    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

    const groups = {};
    students.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      groups[field] = groups[field] || [];
      groups[field].push(firstname);
    });

    Object.keys(groups).forEach((field) => {
      console.log(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

