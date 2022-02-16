const fs = require('fs').promises;

const buildDirectoryPath = `${__dirname}/../build/`;
const staticFilesKey = '/static-files/';
const basePathKey = `{{ public_path }}${staticFilesKey}`;

(async () => {
  const HTML = await fs.readFile(`${buildDirectoryPath}index.html`, 'utf8');
  const replacedHTML = HTML.replaceAll(staticFilesKey, basePathKey);

  await fs.writeFile(`${buildDirectoryPath}index-template-sage.html`, replacedHTML);

  console.log('index-template-sage.html file is generated');
})();
