const fs = require('fs');

const readStr = fs.createReadStream('text.txt', 'utf-8');
let str = '';

readStr.on("data", (chunk)=> { 
    str += chunk
    console.log(str);
})
