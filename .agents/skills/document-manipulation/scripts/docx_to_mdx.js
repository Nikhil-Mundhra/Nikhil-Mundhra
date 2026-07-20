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
    console.error("Usage: node docx_to_mdx.js --input <path-to-docx> --output <path-to-mdx>");
    process.exit(1);
}

const docxPath = path.resolve(args.input);
const mdxPath = path.resolve(args.output);

if (!fs.existsSync(docxPath)) {
  console.error(`Error: Input file does not exist: ${docxPath}`);
  process.exit(1);
}

let mammoth, TurndownService, turndownPluginGfm;
try {
  mammoth = require('mammoth');
  TurndownService = require('turndown');
  turndownPluginGfm = require('turndown-plugin-gfm');
} catch (e) {
  console.log("Installing required packages (mammoth, turndown, turndown-plugin-gfm)...");
  if (process.platform === 'darwin') {
    execSync('brew install mammoth turndown turndown-plugin-gfm', { stdio: 'inherit' });
  } else {
    execSync('npm install --no-save mammoth turndown turndown-plugin-gfm', { stdio: 'inherit' });
  }
  try {
    mammoth = require('mammoth');
    TurndownService = require('turndown');
    turndownPluginGfm = require('turndown-plugin-gfm');
  } catch(err) {
    const globalNodeModules = execSync('npm root -g').toString().trim();
    mammoth = require(path.join(globalNodeModules, 'mammoth'));
    TurndownService = require(path.join(globalNodeModules, 'turndown'));
    turndownPluginGfm = require(path.join(globalNodeModules, 'turndown-plugin-gfm'));
  }
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

turndownService.use(turndownPluginGfm.tables);
turndownService.keep(['iframe']);

turndownService.addRule('videoWrapper', {
  filter: function (node) {
    return node.nodeName === 'DIV' && (node.className.includes('docs-video-wrapper') || node.className.includes('docs-video-grid') || node.className.includes('docs-video-card'));
  },
  replacement: function (content, node) {
    if (node.className.includes('docs-video-card') && node.parentElement && node.parentElement.className.includes('docs-video-grid')) {
      return '';
    }
    let html = node.outerHTML.replace(/allowfullscreen(="")?/gi, 'allowFullScreen');
    html = html.replace(/\sclass=/g, ' className=');
    return '\n\n' + html + '\n\n';
  }
});

turndownService.addRule('br', {
  filter: 'br',
  replacement: function () { return '<br/>'; }
});

function cleanHtmlForMigration(html) {
  let cleanHtml = html;
  cleanHtml = cleanHtml.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<h4>$1</h4>');
  cleanHtml = cleanHtml.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<h3>$1</h3>');
  cleanHtml = cleanHtml.replace(/<p>\s*<(strong|b)>((?:(?!<\/?p>).)*?)<\/\1>\s*<\/p>/gi, (match, tag, content) => {
    const cleanContent = content.replace(/<br\s*\/?>\s*$/i, '');
    return `<h3>${cleanContent}</h3>`;
  });
  cleanHtml = cleanHtml.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h2>$1</h2>');

  const isJunk = (text) => {
    const t = text.toLowerCase().replace(/<[^>]+>/g, '').trim();
    if (!t) return true;
    if (
      t.includes('klarity360') || t.includes('insight agent') || t === 'vs' || 
      t.includes('fabric data agent') || t.includes('decision-oriented') || 
      t.includes('white paper') || t.includes('document control') || 
      t.includes('setup guide') || t.includes('api permissions') || 
      t.includes('pricing') || t.includes('purchasing flow') || 
      t.includes('security document') || t.includes('trial experience') || 
      t.includes('fabric plan') || t.includes('abstract')
    ) return true;
    return false;
  };

  let changed = true;
  while(changed) {
     changed = false;
     cleanHtml = cleanHtml.replace(/^(\s*<a[^>]*><\/a>\s*|\s*)*<(h2|h3)[^>]*>(.*?)<\/\2>/i, (match, prefix, tag, content) => {
        if (isJunk(content)) {
           changed = true;
           return prefix || '';
        }
        return match;
     });
  }

  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*<(strong|b)>\s*Table of Contents\s*<\/\1>\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*Table of Contents\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.replace(/<p[^>]*>(?:(?!<\/?p>).)*?href=["']?#_Toc(?:(?!<\/?p>).)*?<\/p>/gi, '');

  cleanHtml = cleanHtml.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
    let clean = tableHtml
      .replace(/(<\/p>|<\/h[23]>)\s*(<p[^>]*>|<h[23][^>]*>)/gi, '$1<br/><br/>$2')
      .replace(/<p[^>]*>/gi, '')
      .replace(/<\/p>/gi, '')
      .replace(/<h[23][^>]*>/gi, '<strong>')
      .replace(/<\/h[23]>/gi, '</strong>');
      
    let isFirstRow = true;
    clean = clean.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/i, (match, inner) => {
      if (isFirstRow) {
        isFirstRow = false;
        return '<tr>' + inner.replace(/<td/gi, '<th').replace(/<\/td>/gi, '</th>') + '</tr>';
      }
      return match;
    });
    return clean;
  });

  cleanHtml = cleanHtml.replace(/<\s+(?=[a-zA-Z])/g, '&lt; ');
  cleanHtml = cleanHtml.replace(/<(?=[A-Z_]+>)/g, '&lt;');

  return cleanHtml;
}

async function convert() {
  try {
    console.log(`Extracting HTML from: ${docxPath}`);
    const result = await mammoth.convertToHtml({ path: docxPath });
    let html = result.value;
    
    console.log(`Cleaning and converting HTML to Markdown...`);
    const cleanedHtml = cleanHtmlForMigration(html);
    
    let markdown = turndownService.turndown(cleanedHtml);
    markdown = markdown.replace(/<(?=\s*[A-Z])/g, '\\<');
    markdown = markdown.replace(/\bclass="/g, 'className="');
    
    fs.writeFileSync(mdxPath, markdown, 'utf8');
    console.log(`Successfully generated MDX: ${mdxPath}`);
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convert();
