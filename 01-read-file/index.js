const fs = require('fs');
const path = require('path');

fs.writeFile(path.resolve(__dirname, 'text.txt'), )
// console.log(path.join(__dirname));

// const {stdout, stdin} = process;
// // stdout.write("Node.js");
// // stdin.on('data', (data) => stdout.write(data));

// // process.on("exit", (code) => {
// //     if (code === 0) {
// //       stdout.write("Everything is ok");
// //     } else {
// //       stderr.write(`Something went wrong. The program exited with code ${code}`);
// //     }
// // });

// stdout.write("What is your name?\n");
// stdin.on("data", (data)=> {  
//     stdout.write("Hello, ")
//     stdout.write(data);
//     process.exit(); 
// });
// process.on('exit', ()=> stdout.write("Goodbye!"))

