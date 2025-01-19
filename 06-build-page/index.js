const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const files = ['index.html', 'style.css'];

fs.access(distPath, fs.constants.F_OK, (err) => {
  if (err) {
    setupProject();
  } else {
    deleteFolder(distPath, setupProject);
  }
});

function setupProject() {
  createFolder(distPath, () => {
    files.forEach((file) => {
      fs.writeFile(path.join(distPath, file), '', handleError);
    });
    startBundling();
  });
}
function startBundling() {
  processAssetsFolder(distPath);
  compileCssFiles(path.join(distPath, 'style.css'));
  processHtmlTemplate('components', 'project-dist');
}

function deleteFolder(folderPath, callback) {
  //to remove files or directories
  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    handleError(err);
    callback();
  });
}

function createFolder(folderPath, callback) {
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    handleError(err);
    callback && callback();
  });
}

function processAssetsFolder(destPath) {
  const sourceFolder = path.join(__dirname, 'assets');
  const destFolder = path.join(destPath, 'assets');

  createFolder(destFolder, () => {
    copyDir(sourceFolder, destFolder);
  });
}

// function processAssetsFolderRecursive(sourcePath, destPath) {
//   createFolder(destPath, () => {
//     fs.readdir(sourcePath, { withFileTypes: true }, (err, entries) => {
//       handleError(err);
//       entries.forEach((entry) => {
//         const sourceEntry = path.join(sourcePath, entry.name);
//         const destEntry = path.join(destPath, entry.name);

//         if (entry.isDirectory()) {
//           processAssetsFolderRecursive(sourceEntry, destEntry);
//         } else {
//           fs.copyFile(sourceEntry, destEntry, handleError);
//         }
//       });
//     });
//   });
// }

function copyDir(sourcePath, outputPath) {
  fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const srcFile = path.join(sourcePath, file.name);
      const destFile = path.join(outputPath, file.name);

      if (file.isDirectory()) {
        createFolder(destFile, () => {
          copyDir(srcFile, destFile);
        });
      } else {
        fs.copyFile(srcFile, destFile, (err) => {
          if (err) throw err;
          console.log(`Copied: ${file.name}`);
        });
      }
    });
  });
}
function compileCssFiles(outputPath) {
  const sourcePath = path.join(__dirname, 'styles');

  fs.readdir(sourcePath, { withFileTypes: true }, (err, entries) => {
    handleError(err);
    entries
      .filter((entry) => entry.isFile() && path.extname(entry.name) === '.css')
      .forEach((entry) => {
        const filePath = path.join(sourcePath, entry.name);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          handleError(err);
          fs.appendFile(outputPath, data + '\n', handleError);
        });
      });
  });
}

function processHtmlTemplate(componentsFolder, outputFolder) {
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, componentsFolder);
  const outputPath = path.join(__dirname, outputFolder, 'index.html');

  fs.readFile(templatePath, 'utf-8', (err, template) => {
    handleError(err);

    fs.readdir(componentsPath, { withFileTypes: true }, (err, entries) => {
      handleError(err);

      let pendingReplacements = entries.length;

      entries.forEach((entry) => {
        const componentPath = path.join(componentsPath, entry.name);
        const componentName = path.basename(
          entry.name,
          path.extname(entry.name),
        );
        const regex = new RegExp(`\\{\\{${componentName}\\}\\}`, 'g');

        fs.readFile(componentPath, 'utf-8', (err, content) => {
          handleError(err);
          template = template.replace(regex, content);

          if (--pendingReplacements === 0) {
            fs.writeFile(outputPath, template, (err) => {
              handleError(err);
              console.log(
                `HTML template processed and saved to: ${outputPath}`,
              );
            });
          }
        });
      });
    });
  });
}
function handleError(err) {
  if (err) console.error(err);
}
