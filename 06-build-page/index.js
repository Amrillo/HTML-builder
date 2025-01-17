const fs = require('fs')
const path = require('path');

const distPath = path.join(__dirname,'project-dist');
const files = ['index.html','style.css'] 


fs.access(distPath, fs.constants.F_OK, (err)=> {  
    if(err) {  
        fs.mkdir(distPath, (err)=> {  
            if(err) throw err;
            files.forEach(file => {  
                fs.writeFile(path.join(distPath, file), "", (err)=> { 
                    if(err) throw err;
                })
            });
            creatAssetsFolder(distPath);
        })
    } else { 
        fs.unlink(distPath, (err)=> {  
            if(err) throw err;
            console.log("project-dist is removed");
        })
    }
});

function creatAssetsFolder(dirPath) {  
    const folderName = "assets"
    const filePath = path.join(dirPath, folderName)
    fs.mkdir(filePath, (err)=> {  
        if(err) throw err;
    });

    fs.readdir(path.join(__dirname, folderName), (err,files)=> {  
        if(err) throw err;
        console.log(files);  
        files.forEach(file => {  
            console.log(file.name);
        })
    })
}