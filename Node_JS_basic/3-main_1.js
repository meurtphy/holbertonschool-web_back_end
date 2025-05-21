const countStudents = require('./3-read_file_async');

countStudents('database.csv')
  .then(() => console.log('Done!'))
  .catch((err) => console.log(err));
console.log('After!');
