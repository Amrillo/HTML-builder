const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

const filePath = path.resolve(__dirname, 'text.txt');

stdout.write('Hello.Please write some text\n');

stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    stdout.write('Your messaged is saved');
    process.exit();
  } /// for exiting if exit is typed

  fs.appendFile(filePath, input + '\n', (err) => {
    if (err) {
      throw err;
    }
  });
});
