const fs = require("fs");
const path = require("path");

const baseFilePath = path.join(__dirname, "files");

fs.mkdir(path.join(__dirname, "files-copy"),(err)=> {  
    if(err) throw err;
    fs.readdir(baseFilePath, (err,files) => {  
       if(err) throw err;
        files.forEach(file => {  
            console.log(file);
        })
    })
})