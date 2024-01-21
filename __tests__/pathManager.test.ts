import { expect, describe, it } from '@jest/globals';

import pathManager from '../src';
import { missingRequiredParametersMsg, invalidParametersMsg } from '../src/methods/constants';

const nameAndPathMap = {
  example: '/example/{exampleId}/{slug}',
  noParams: '/no-params',
};

const { getPath, getFullPath } = pathManager(nameAndPathMap);

// Tests without base url
describe('pathManager without the base url test', () => {
  it('getPath() can get the path by name and returns it with given parameters.', () => {
    expect(getPath('example', { exampleId: '1', slug: 'abc' }))
      .toBe('/example/1/abc');
  });

  it('getPath() returns the valid path if unnecessary route parameters are provided.', () => {
    expect(getPath('noParams', { param1: 'a', param2: 'b' }))
      .toBe('/no-params');
  });

  it('getPath() returns the valid path if unnecessary route parameters and empty query params object are provided.', () => {
    expect(getPath('noParams', { param1: 'a', param2: 'b' }, {}))
      .toBe('/no-params');
  });

  it('getPath() returns the valid path if unnecessary route parameters when query params are provided.', () => {
    expect(getPath('noParams', { param1: 'a', param2: 'b' }, { param1: 'a', param2: 'b' }))
      .toBe('/no-params/?param1=a&param2=b');
  });

  it('getPath() returns the path with query parameters if an object is provided as 3rd argument.', () => {
    expect(getPath('example', { exampleId: '1', slug: 'abc' }, { page: '1', type: 'fire' }))
      .toBe('/example/1/abc/?page=1&type=fire');
  });

  it('getPath() returns the path with query parameters if an empty object is provided as the 2nd argument and an object of query parameters is provided as the 3rd argument.', () => {
    expect(getPath('noParams', {}, { page: '1', type: 'fire' }))
      .toBe('/no-params/?page=1&type=fire');
  });

  it('getPath() throws Error if required parameters are missing.', () => {
    expect(() => getPath('example'))
      .toThrow(missingRequiredParametersMsg('example', nameAndPathMap.example));

    expect(() => getPath('example', { slug: 'abc' }))
      .toThrow(missingRequiredParametersMsg('example', nameAndPathMap.example));

    expect(() => getPath('example', {}, { page: '1', type: 'fire' }))
      .toThrow(missingRequiredParametersMsg('example', nameAndPathMap.example));
  });

  it('getPath() throws Error if invalid parameters were provided.', () => {
    expect(() => getPath('example', { param1: 'a', param2: 'b' }))
      .toThrow(invalidParametersMsg('example', nameAndPathMap.example));
  });

  it('getFullPath() returns the path without base url', () => {
    expect(getFullPath('example', { exampleId: '1', slug: 'abc' }, { page: '1', type: 'fire' }))
      .toBe('/example/1/abc/?page=1&type=fire');

    expect(getFullPath('example', { exampleId: '1', slug: 'abc' }))
      .toBe('/example/1/abc');

    expect(getFullPath('example', { exampleId: '1', slug: 'abc' }, {}))
      .toBe('/example/1/abc');

    expect(getFullPath('noParams')).toBe('/no-params');

    expect(getFullPath('noParams', { param1: '1', param2: '2' }))
      .toBe('/no-params');

    expect(getFullPath('noParams', { param1: '1', param2: '2' }, { param1: 'a', param2: 'b' }))
      .toBe('/no-params/?param1=a&param2=b');

    expect(getFullPath('noParams', {}, { param1: 'a', param2: 'b' }))
      .toBe('/no-params/?param1=a&param2=b');
  });
});

// Tests with base url
const baseUrl = 'http://example.com';
const {
  getPath: withoutBaseUrl,
  getFullPath: WithBaseUrl,
} = pathManager(nameAndPathMap, baseUrl);

describe('pathManager with the base url test', () => {
  it('getPath() returns a path without the base url.', () => {
    expect(withoutBaseUrl('example', { exampleId: '1', slug: 'abc' }))
      .toBe('/example/1/abc');

    expect(withoutBaseUrl('example', { exampleId: '1', slug: 'abc' }, { page: '1', type: 'fire' }))
      .toBe('/example/1/abc/?page=1&type=fire');

    expect(withoutBaseUrl('noParams')).toBe('/no-params');

    expect(withoutBaseUrl('noParams', {}, { param1: 'a', param2: 'b' }))
      .toBe('/no-params/?param1=a&param2=b');

    expect(withoutBaseUrl('noParams', { param1: 'a', param2: 'b' }))
      .toBe('/no-params');

    expect(withoutBaseUrl('noParams', { param1: 'a', param2: 'b' }, { param1: 'a', param2: 'b' }))
      .toBe('/no-params/?param1=a&param2=b');
  });

  it('getFullPath() returns the correct path with the base url', () => {
    expect(WithBaseUrl('noParams')).toBe(`${baseUrl}/no-params`);

    expect(WithBaseUrl('noParams', { param1: 'a', param2: 'b' }))
      .toBe(`${baseUrl}/no-params`);

    expect(WithBaseUrl('noParams', {}, { param1: '1', param2: '2' }))
      .toBe(`${baseUrl}/no-params/?param1=1&param2=2`);

    expect(WithBaseUrl('noParams', { param1: 'a', param2: 'b' }, { param1: '1', param2: '2' }))
      .toBe(`${baseUrl}/no-params/?param1=1&param2=2`);

    expect(WithBaseUrl('example', { exampleId: '1', slug: 'abc' }))
      .toBe(`${baseUrl}/example/1/abc`);

    expect(WithBaseUrl('example', { exampleId: '1', slug: 'abc' }, {}))
      .toBe(`${baseUrl}/example/1/abc`);

    expect(WithBaseUrl('example', { exampleId: '1', slug: 'abc' }, { page: '1', type: 'fire' }))
      .toBe(`${baseUrl}/example/1/abc/?page=1&type=fire`);
  });
});
