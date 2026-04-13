const fs = require('fs');
const path = require('path');

const notesPath = path.join(__dirname, '../public/notes');
const outputPath = path.join(__dirname, '../src/data/notesConfig.json');

function scanDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const result = {};

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // It's a folder (topic)
      const notes = [];
      const files = fs.readdirSync(fullPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          notes.push(file.replace('.md', ''));
        }
      }
      if (notes.length > 0) {
        result[item] = {
          name: item.replace(/-/g, ' '),
          notes: notes
        };
      }
    }
  }
  
  return result;
}

function generateConfig() {
  const subjects = fs.readdirSync(notesPath);
  const config = {};

  for (const subject of subjects) {
    const subjectPath = path.join(notesPath, subject);
    const stat = fs.statSync(subjectPath);
    
    if (stat.isDirectory()) {
      config[subject] = {
        name: subject.toUpperCase(),
        topics: scanDirectory(subjectPath)
      };
    }
  }

  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));
  console.log('✅ Notes config generated successfully!');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📚 Found ${Object.keys(config).length} subjects`);
}

generateConfig();