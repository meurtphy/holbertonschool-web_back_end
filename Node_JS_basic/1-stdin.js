// 1-stdin.js

process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
  const name = input.trim();
  console.log(`Your name is: ${name}`);
});

// When the process is exiting (ex: piped input finishes), log the closing message
process.on('exit', () => {
  console.log('This important software is now closing');
});