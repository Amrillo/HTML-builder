const fs = require("fs");
const path = require("path");

const baseFilePath = path.join(__dirname, "files");
const newFolderPath = path.join(__dirname,"files-copy");

fs.access(newFolderPath, (err) => {
  if (err) {
    // If the folder doesn't exist, create it
    fs.mkdir(newFolderPath, (err) => {
      if (err) throw err;
      console.log("Folder created:", newFolderPath);
      copyFiles(); // Proceed to copy files after folder creation
    });
  } else {
    // If the folder exists, clear it first
    clearFolder(newFolderPath, (err) => {
      if (err) throw err;
      copyFiles(); // Proceed to copy files after clearing the folder
    });
  }
});




// Function to clear the target folder
function clearFolder(folderPath, callback) {

  fs.readdir(folderPath, (err, files) => {
    if (err) return callback(err);

    // Delete all files in the folder
    const deletePromises = files.map((file) =>
      fs.promises.unlink(path.join(folderPath, file))
    );

    Promise.all(deletePromises)
      .then(() => {
        callback();
      })
      .catch(callback);
  });
}

// Function to copy files from the source folder to the target folder
function copyFiles() {
  fs.readdir(baseFilePath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const srcFile = path.join(baseFilePath, file);
      const destFile = path.join(newFolderPath, file);

      // Copy each file
      fs.copyFile(srcFile, destFile, (err) => {
        if (err) throw err;
        console.log(`Copied: ${file}`);
      });
    });
  });
}