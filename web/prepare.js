const fs = require('fs');
const { exec } = require('child_process');

if (fs.existsSync('.git')) {
  exec('npx husky install', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else {
  console.log('.git directory not found. Skipping Husky installation.');
}
