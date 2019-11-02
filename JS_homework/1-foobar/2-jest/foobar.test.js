
import foobar from './foobar';

test('test foobar for foobar for first 15', () => {
	const result = foobar(15);
	const expected = [
		1,
		2,
		'foo',
		4,
		'bar',
		'foo',
		7,
		8,
		'foo',
		'bar',
		11,
		'foo',
		13,
		14,
		'foobar',
	];

	expect(result).toEqual(expected);
});