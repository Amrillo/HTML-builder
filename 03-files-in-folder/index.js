const path = require('path');
const fs = require('fs');

const  secretFolderPath = path.join(__dirname, 'secret-folder');


fs.readdir(secretFolderPath, {withFileTypes: true}, (err,items)=>{  

    if (err) {
        return console.error('Error reading the folder:', err.message);
      }
  
    items.forEach((item)=> {  
        if(item.isFile() && item.name !== '.gitkeep') {  

           const filePath = path.join(secretFolderPath, item.name);
          
           fs.stat(filePath, (err,stats) => {  
            if (err) {
               throw err
            }
            const fileName = path.parse(item.name).name;
            const fileExtension =  path.extname(item.name).slice(1);
 
            const fileSize = (stats.size / 1024).toFixed(3);
            console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
           })
        }
    });
});

       