import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC = 'Extracted/dr-khushboo-gour/project';
const OUT = 'site';
mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'images'), { recursive: true });

const between = (s, openRe, closeStr) => {
  const m = openRe.exec(s);
  if (!m) throw new Error('open not found: ' + openRe);
  const start = m.index + m[0].length;
  const end = s.indexOf(closeStr, start);
  if (end === -1) throw new Error('close not found: ' + closeStr);
  return s.slice(start, end);
};

function transform(srcFile, { title }) {
  const raw = readFileSync(join(SRC, srcFile), 'utf8');
  const helmet = between(raw, /<helmet>/, '</helmet>');
  // body markup: from end of </helmet> to start of </x-dc>
  const afterHelmet = raw.slice(raw.indexOf('</helmet>') + '</helmet>'.length);
  const body = afterHelmet.slice(0, afterHelmet.indexOf('</x-dc>'));

  // optional component script (home page only)
  let bootScript = '';
  const scriptOpen = /<script\b[^>]*\bdata-dc-script\b[^>]*>/.exec(raw);
  if (scriptOpen) {
    let code = between(raw, /<script\b[^>]*\bdata-dc-script\b[^>]*>/, '</script>');
    // unwrap the proprietary base class -> plain standalone class
    code = code.replace('class Component extends DCLogic {', 'class Component {');
    bootScript = `<script>
${code}
(function(){
  function __boot(){
    var c = new Component();
    c.props = { showFloatingToys:true, toyDensity:7, crayonHeadings:true };
    c.componentDidMount();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __boot);
  else __boot();
})();
</script>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${helmet.trim()}
</head>
<body>
${body.trim()}
${bootScript}
</body>
</html>
`;
  return html;
}

const home = transform('AAKAR.dc.html', { title: 'AAKAR Child Development Centre' });
writeFileSync(join(OUT, 'index.html'), home);
writeFileSync(join(OUT, 'AAKAR.dc.html'), home); // preserve "Back to home" links from sub-pages

writeFileSync(join(OUT, 'Gallery.dc.html'),
  transform('Gallery.dc.html', { title: 'Gallery · AAKAR Child Development Centre' }));
writeFileSync(join(OUT, 'Workshops & Training.dc.html'),
  transform('Workshops & Training.dc.html', { title: 'Workshops & Training · AAKAR Child Development Centre' }));

// copy helper script + all images verbatim
copyFileSync(join(SRC, 'image-slot.js'), join(OUT, 'image-slot.js'));
for (const f of readdirSync(join(SRC, 'images'))) {
  copyFileSync(join(SRC, 'images', f), join(OUT, 'images', f));
}

console.log('Built:', readdirSync(OUT));
