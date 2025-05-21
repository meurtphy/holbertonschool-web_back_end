const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!\n');
});

app.listen(1245);
module.exports = app;
