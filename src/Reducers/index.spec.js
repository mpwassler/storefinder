import reducer from './index'

describe('reducer', () => {
	test('returns state', () => {
		const result = reducer(undefined, {type: 'ANYTHING'})
		expect(result).toBeDefined()
	})
})