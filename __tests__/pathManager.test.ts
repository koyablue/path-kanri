import {expect, jest, test, describe, it} from '@jest/globals';
import pathManager from "../src";

const nameAndPathMap = {
	example: '/example/{exampleId}/{slug}',
	noParams: '/no-params',
}

const { getPath } = pathManager(nameAndPathMap)

describe('pathManager test', () => {

	it('getPath() can get a path by name and returns it with given parameters.', () => {
		expect(getPath('example', {exampleId: '1', slug: 'abc'})).toBe('/example/1/abc')
	});

	it('getPath() returns a valid path if unnecessary parameters were provided.', () => {
		expect(getPath('noParams', { param1: 'a', param2: 'b' })).toBe('/no-params')
	});

	it('getPath() throws error if invalid parameters were provided.', () => {
		expect(() => getPath('example')).toThrow(`Missing required parameters for ${nameAndPathMap.example}.`);
		// expect(() => getPath('example', { slug: 'abc' })).toThrow(`Missing required parameters for ${nameAndPathMap.example}.`);
		expect(() => getPath('example', { param1: 'a', param2: 'b' })).toThrow(`Given parameters are not valid for ${nameAndPathMap.example}.`)
	});
});