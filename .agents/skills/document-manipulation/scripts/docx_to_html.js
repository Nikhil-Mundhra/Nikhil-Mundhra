const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' || args[i] === '-i') {
            options.input = args[++i];
        } else if (args[i] === '--output' || args[i] === '-o') {
            options.output = args[++i];
        }
    }
    return options;
}

const args = parseArgs();
if (!args.input || !args.output) {
    console.error("Usage: node docx_to_html.js --input <path-to-docx> --output <path-to-html-or-json>");
    process.exit(1);
}

const docxPath = path.resolve(args.input);
const outputPath = path.resolve(args.output);

async function convert() {
  let mammoth;
  try {
    mammoth = require('mammoth');
  } catch (e) {
    console.log("Installing 'mammoth'...");
    if (process.platform === 'darwin') {
      execSync('brew install mammoth', { stdio: 'inherit' });
    } else {
      execSync('npm install --no-save mammoth', { stdio: 'inherit' });
    }
    try {
      mammoth = require('mammoth');
    } catch(err) {
      // Fallback in case brew installs it globally or node can't resolve it immediately
      const globalNodeModules = execSync('npm root -g').toString().trim();
      mammoth = require(path.join(globalNodeModules, 'mammoth'));
    }
  }

  try {
    if (!fs.existsSync(docxPath)) {
      console.error(`Error: Input file does not exist: ${docxPath}`);
      process.exit(1);
    }
    console.log(`Reading from: ${docxPath}`);
    const result = await mammoth.convertToHtml({ path: docxPath });
    const html = result.value; 
    const messages = result.messages; 
    
    if (messages.length > 0) {
      console.log('Mammoth conversion messages:', messages);
    }
    
    if (outputPath.endsWith('.json')) {
      const jsonObj = { html: html };
      fs.writeFileSync(outputPath, JSON.stringify(jsonObj, null, 2), 'utf8');
      console.log(`Successfully converted docx to JSON: ${outputPath}`);
    } else {
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`Successfully converted docx to HTML: ${outputPath}`);
    }
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convert();
