const fs = require('fs');
const path = require('path');

const destFolder = path.join(__dirname, 'project-dist');
const bundlePath = path.join(destFolder, 'bundle.css');

fs.mkdir(destFolder, { recursive: true }, (err) => {
  if (err) throw err;

  // Ensure the `bundle.css` is created fresh
  fs.access(bundlePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // If `bundle.css` exists, delete it first
      fs.unlink(bundlePath, (err) => {
        if (err) throw err;
        console.log('Old bundle.css deleted.');
        startBundling();
      });
    } else {
      // If `bundle.css` does not exist, proceed
      startBundling();
    }
  });
});

function startBundling() {
  createFile(bundlePath, () => compileCssFiles(bundlePath));
}

// Create the bundle.css file
function createFile(filePath, callBack) {
  fs.writeFile(filePath, '', (err) => {
    if (err) throw err;
    console.log(`${filePath} created.`);
    if (callBack) callBack();
  });
}

// Compile all CSS files into the bundle
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
          fs.appendFile(outputPath, data + '\n', (err) => {
            handleError(err);
            console.log(`${entry.name} merged to bundle.css`);
          });
        });
      });
  });
}

// Error handling function
function handleError(err) {
  if (err) console.error(err);
}
