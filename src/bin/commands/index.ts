import * as fs from 'fs';

/**
 * create file
 *
 */
const init = (dirPath: string, stubPath: string) => {
  console.log('dirPath:', dirPath)
  console.log('stubPath:', stubPath)
  console.log('__dirname:', __dirname)
// npx pathkanri-publish
// dirPath: /Users/koyaaoyama/projects/sandbox-reac-app/node_modules/path-kanri/build/src/bin/pathKanri
// stubPath: /Users/koyaaoyama/projects/sandbox-reac-app/node_modules/path-kanri/build/src/bin/stubs/pathKanri.stub
// __dirname: /Users/koyaaoyama/projects/sandbox-reac-app/node_modules/path-kanri/build/src/bin/commands


  // if (!fs.existsSync(dirPath)) {
  //   fs.mkdirSync(dirPath);
  // }

  // const indexTs = `${dirPath}/index.ts`;
  // fs.writeFileSync(indexTs, '');
  // fs.copyFileSync(stubPath, indexTs);
};

export default init;
