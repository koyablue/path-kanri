import * as fs from 'fs';

/**
 * create file
 *
 */
const init = () => {
  const dirName = 'pathKanri';
  const dirFullPath = `${__dirname}/${dirName}`;

  const stubFileName = 'pathKanri.stub';
  const stubFullPath = `${__dirname}/stubs/${stubFileName}`;

  if (!fs.existsSync(dirFullPath)) {
    fs.mkdirSync(dirFullPath);
  }

  const indexTs = `${dirFullPath}/index.ts`;
  fs.writeFileSync(indexTs, '');
  fs.copyFileSync(stubFullPath, indexTs);
};

export default init;
