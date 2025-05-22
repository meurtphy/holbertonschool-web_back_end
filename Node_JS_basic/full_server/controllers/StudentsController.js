import readDatabase from '../utils.js';

class StudentsController {
  static getAllStudents(req, res) {
    const path = process.argv[2];
    readDatabase(path)
      .then((data) => {
        let response = 'This is the list of our students';
        const fields = Object.keys(data).sort(); // tri alpha insensible à la casse

        for (const field of fields) {
          const names = data[field];
          response += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        }

        res.status(200).send(response);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const path = process.argv[2];
    const major = req.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(path)
      .then((data) => {
        const names = data[major];
        res.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
