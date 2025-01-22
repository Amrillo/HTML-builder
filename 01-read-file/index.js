const fs = require('fs');
const path = require('path');


const readStr = fs.createReadStream(path.join(__dirname, "text.txt"), 'utf-8');
let str = '';

readStr.on('data', (chunk) => {
  str += chunk;
  console.log(str);
});