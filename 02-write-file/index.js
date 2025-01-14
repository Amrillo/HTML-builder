const fs = require('fs');
const path = require('path');
const {stdout, stdin} = process;

const filePath = path.resolve(__dirname, 'text.txt');

stdout.write("Please write some text\n");

stdin.on("data", (data)=> {  
    const input = data.toString().trim();
    if(input.toLowerCase() === 'exit') {  
        stdout.write('Спасибо что были с нами');
        process.exit();
    }
    
    content = Buffer.from(data, "utf-8");
    stdout.write(content);
    fs.writeFile(path.resolve(__dirname,'text.txt'),content, (err)=> {  
        if(err) {  
            throw err;
        }
    } );
})


// // stdin.on("data", (data) => stdout.write(data));
// stdout.write('Text file has been created');