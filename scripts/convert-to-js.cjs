const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const root = process.cwd();
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(full);
    }
  }
}

walk(root);

(async () => {
  for (const file of files) {
    const rel = path.relative(root, file);
    const ext = path.extname(file);
    const outExt = ext === '.tsx' ? '.jsx' : '.js';
    const outPath = path.join(path.dirname(file), path.basename(file, ext) + outExt);
    const source = fs.readFileSync(file, 'utf8');

    const result = await esbuild.transform(source, {
      loader: ext === '.tsx' ? 'tsx' : 'ts',
      format: 'esm',
      jsx: 'automatic',
      target: 'es2020',
      sourcemap: false,
    });

    let output = result.code;
    output = output.replace(/(from\s+["'])(\.{1,2}\/[^"']+?)(\.tsx|\.ts)(["'])/g, (_, prefix, p, __, suffix) => `${prefix}${p}${outExt}${suffix}`);
    output = output.replace(/(["'])(\.{1,2}\/[^"']+?)(\.tsx|\.ts)(["'])/g, (_, prefix, p, __, suffix) => `${prefix}${p}${outExt}${suffix}`);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output, 'utf8');
    console.log(`Converted ${rel} -> ${path.relative(root, outPath)}`);
  }

  const htmlPath = path.join(root, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8').replace('/src/main.tsx', '/src/main.jsx');
    fs.writeFileSync(htmlPath, html, 'utf8');
  }

  const configPath = path.join(root, 'vite.config.ts');
  if (fs.existsSync(configPath)) {
    fs.renameSync(configPath, path.join(root, 'vite.config.js'));
  }

  const oldFiles = files.filter((file) => {
    const rel = path.relative(root, file);
    return rel !== 'vite.config.ts';
  });

  for (const file of oldFiles) {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
      } catch (error) {
        console.warn(`Could not delete ${path.relative(root, file)}: ${error.message}`);
      }
    }
  }
})();
