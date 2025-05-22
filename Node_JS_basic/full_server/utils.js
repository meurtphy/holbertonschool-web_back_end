import { readFile } from 'fs/promises';

export default function readDatabase(path) {
  return readFile(path, 'utf8')
    .then((data) => {
      const lines = data.trim().split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);

      const fields = {};

      for (const student of students) {
        const [firstname, , , field] = student.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }

      return fields;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}
