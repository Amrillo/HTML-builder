const fs = require("fs");
const path = require("path");

const destFolder = path.join(__dirname, "project-dist");
const bundlePath = path.join(destFolder, 'bundle.css');

// Ensure the `bundle.css` is created fresh
fs.access(bundlePath, fs.constants.F_OK, (err)=> {  
    if(!err){ 
        // If `bundle.css` exists, delete it first
        fs.unlink(bundlePath, (err) => {
            if (err) throw err;
            console.log("Old bundle.css deleted.");
            startBundling();
        })
    } else { 
        // If `bundle.css` does not exist, proceed
        startBundling();
    }
})



// fs.readFile(path.join(destFolder, 'bundle.css'), (err)=> {  
//     if(err) {  
//        createBundleCss(bundlePath);
//        processBundling(__dirname,bundlePath);
//     }
//     else {  
//         fs.unlink(bundlePath, (err) => {
//             if(err) throw err;
//             createBundleCss(bundlePath);
//             processBundling(__dirname,bundlePath);
//           });
//     }
// });

function startBundling() { 
    createFile(bundlePath, ()=> processBundling(__dirname, bundlePath));
}


//  create the bundle css
function createFile(filePath, callBack) {
    fs.writeFile(filePath, "",(err)=> {  
        if(err) throw err;
        console.log(`${filePath} created.`);
        if(callBack) callBack();
    })
}

//check each folder 
function processBundling(dirPath, outputPath) {  
    
    fs.readdir(dirPath, {withFileTypes: true},(err,files)=> {  
        if(err) throw err;

        files.forEach(file => { 
          const pathFile = path.join(dirPath, file.name);

          if(file.isDirectory()){  

             // Recursively process subdirectories
             processBundling(pathFile,outputPath);

          } else if(file.isFile() && file !== "bundle.css" && path.extname(pathFile) === '.css') { 
             // Append CSS file content to `bundle.css`
            fs.readFile(pathFile, 'utf-8', (err,data)=> {  
              if (err) throw err;

              fs.appendFile(outputPath, data + '\n', (err)=> { 
                 if(err) throw err;
                 console.log(`${file.name} merged to bundle.css`);
               })
            })
          }
        }) 
    })
}