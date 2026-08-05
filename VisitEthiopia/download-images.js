const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const workspace = path.resolve(__dirname);
const scriptPath = path.join(workspace, 'script.js');
const imgDir = path.join(workspace, 'img');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

const script = fs.readFileSync(scriptPath, 'utf8');
const parseBlock = block => Array.from(block.matchAll(/"([^"\\]+)":\s*"([^"]+)"/g)).map(m => ({ name: m[1], url: m[2] }));
const pinBlock = script.match(/const PIN = \{([\s\S]*?)\};/m);
const unescoBlock = script.match(/const PIN_UNESCO = \{([\s\S]*?)\};/m);
if (!pinBlock) throw new Error('PIN block not found');
const pins = parseBlock(pinBlock[1]);
const unesco = unescoBlock ? parseBlock(unescoBlock[1]) : [];
const all = [...pins, ...unesco];
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const downloadList = all
  .filter(item => /^https?:\/\//i.test(item.url))
  .map(item => {
    const ext = path.extname(item.url).split('?')[0] || '.jpg';
    const file = slug(item.name) + ext;
    return { ...item, file, local: `img/${file}` };
  });

const get = url => url.startsWith('https://') ? https : http;
const downloadFile = ({ url, target }) => new Promise((resolve, reject) => {
  if (fs.existsSync(target)) return resolve(target);
  const stream = fs.createWriteStream(target);
  const req = get(url).get(url, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadFile({ url: res.headers.location, target }).then(resolve, reject);
    }
    if (res.statusCode !== 200) {
      stream.close();
      fs.unlinkSync(target, { force: true });
      return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
    }
    res.pipe(stream);
    stream.on('finish', () => stream.close(resolve));
  });
  req.on('error', err => {
    stream.close();
    fs.unlinkSync(target, { force: true });
    reject(err);
  });
});

(async () => {
  console.log(`Downloading ${downloadList.length} images to ${imgDir}`);
  for (const item of downloadList) {
    const target = path.join(imgDir, item.file);
    try {
      await downloadFile({ url: item.url, target });
      console.log('Saved', item.file);
    } catch (err) {
      console.error('Failed', item.url, err.message);
    }
  }
  let updated = script;
  for (const item of downloadList) {
    const escapedName = item.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(\"${escapedName}\"\s*:\s*\")([^\"]+)(\")`, 'g');
    updated = updated.replace(regex, `$1${item.local}$3`);
  }
  fs.writeFileSync(scriptPath, updated, 'utf8');
  console.log('Updated script.js with local image paths.');
})();
