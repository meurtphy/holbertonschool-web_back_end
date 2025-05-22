import readDatabase from '../utils';
class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((students) => {
        const output = ['This is the list of our students'];
        const sortedFields = Object.keys(students).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
        sortedFields.forEach((field) => {
          output.push(
            `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`,
          );
        });
        response.status(200).send(output.join('\n'));
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(process.argv[2])
      .then((students) => {
        if (students[major]) {
          response.status(200).send(`List: ${students[major].join(', ')}`);
        } else {
          response.status(500).send('Major not found');
        }
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
}
export default StudentsController;