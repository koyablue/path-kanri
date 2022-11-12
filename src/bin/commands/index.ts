import * as fs from 'fs';

/**
 * create file
 *
 */
const init = (dirPath: string, stubPath: string) => {
  console.log('dirPath:', dirPath)
  console.log('stubPath:', stubPath)
  console.log('__dirname:', __dirname)
  // if (!fs.existsSync(dirPath)) {
  //   fs.mkdirSync(dirPath);
  // }

  // const indexTs = `${dirPath}/index.ts`;
  // fs.writeFileSync(indexTs, '');
  // fs.copyFileSync(stubPath, indexTs);
};

export default init;
