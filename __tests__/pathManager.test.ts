import {expect, jest, test, describe, it} from '@jest/globals';
import pathManager from "../src";

const nameAndPathMap = {
	example: '/example/{exampleId}/{slug}',
}

const { getPath } = pathManager(nameAndPathMap)

describe('pathManager test', () => {
	it('getPath() can get path with parameters', () => {
		expect(getPath('example', {exampleId: '1', slug: 'abc'})).toBe('/example/1/abc')
	})
});