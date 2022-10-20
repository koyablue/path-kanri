import * as fs from 'fs';

/**
 * create file
 *
 */
const init = (dirPath: string, stubPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const indexTs = `${dirPath}/index.ts`;
  fs.writeFileSync(indexTs, '');
  fs.copyFileSync(stubPath, indexTs);
};

export default init;
