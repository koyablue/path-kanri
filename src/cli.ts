import * as fs from 'fs';

const init = () => {
  // const dirName = 'pathKanri';
  // fs.existsSync(dirName);
  fs.mkdir('test', (mkdirErr) => {
    if (mkdirErr) { throw mkdirErr; }
    fs.writeFile('test/test.txt', 'Hello!', (writeFileErr) => {
      if (writeFileErr) { throw writeFileErr; }
      console.log('test/test.txtが作成されました');
    });
  });
};
