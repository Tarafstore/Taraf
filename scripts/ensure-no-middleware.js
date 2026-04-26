const fs = require('node:fs');
const path = require('node:path');

const middlewarePath = path.join(process.cwd(), 'middleware.ts');

if (fs.existsSync(middlewarePath)) {
  console.error('Build blocked: middleware.ts detected. Use proxy.ts only (Next.js 16).');
  process.exit(1);
}
