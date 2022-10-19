import pathManager from './methods';

const pathNameAndUriMap = {
  home: '/',
  example: '/example/{exampleId}/{slug}',
  login: '/login',
  mypage: '/mypage',
} as const;

const { getPath } = pathManager(pathNameAndUriMap);

const main = () => {
  console.log(getPath('example', { exampleId: '1', slug: 'abc' }));
};

main();

// TODO: export method from index.ts
// TODO: create base file(by using fs and stub files)
