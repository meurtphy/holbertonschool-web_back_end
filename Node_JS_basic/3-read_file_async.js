const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf-8')
    .then((data) => {
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1).map((line) => line.split(','));

      const fields = {};
      for (const student of students) {
        const [firstname, , , field] = student;
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      console.log(`Number of students: ${students.length}`);
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }
      }
    })
    .catch(() => Promise.reject(new Error('Cannot load the database')));
}

module.exports = countStudents;
