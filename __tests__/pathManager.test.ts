import { expect, describe, it } from '@jest/globals';

import pathManager from '../src';
import { missingRequiredParametersMsg, invalidParametersMsg } from '../src/methods/constants';

const nameAndPathMap = {
  example: '/example/{exampleId}/{slug}',
  noParams: '/no-params',
};

const { getPath } = pathManager(nameAndPathMap);

describe('pathManager without the base url test', () => {
  it('getPath() can get a path by name and returns it with given parameters.', () => {
    expect(getPath('example', { exampleId: '1', slug: 'abc' })).toBe('/example/1/abc');
  });

  it('getPath() returns a valid path if unnecessary parameters were provided.', () => {
    expect(getPath('noParams', { param1: 'a', param2: 'b' })).toBe('/no-params');
  });

  it('getPath() returns the path with query parameters if an object is provided as 3rd argument.', () => {
    expect(getPath('example', { exampleId: '1', slug: 'abc' }, { page: '1', type: 'fire' })).toBe('/example/1/abc/?page=1&type=fire');
  });

  it('getPath() throws Error if required parameters are missing.', () => {
    expect(() => getPath('example')).toThrow(missingRequiredParametersMsg('example', nameAndPathMap.example));

    expect(() => getPath('example', { slug: 'abc' })).toThrow(missingRequiredParametersMsg('example', nameAndPathMap.example));
  });

  it('getPath() throws Error if invalid parameters were provided.', () => {
    expect(() => getPath('example', { param1: 'a', param2: 'b' })).toThrow(invalidParametersMsg('example', nameAndPathMap.example));
  });
});

const baseUrl = 'http://example.com';
const { getPath: getPathWithBaseUrl } = pathManager(nameAndPathMap, baseUrl);
describe('pathManager with the base url test', () => {
  it('getPath() returns a path with the base url if the base url is provided.', () => {
    expect(getPathWithBaseUrl('example', { exampleId: '1', slug: 'abc' })).toBe(`${baseUrl}/example/1/abc`);
  });
});
