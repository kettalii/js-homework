
import greet from './helloworld';

/**
 * remove the '.skip' to enable this test
 */
test('without an argument the function should output "hello world"', () => {
	const result = greet();

	expect(result).toEqual('hello world');
});

test('with the argument "class" the function should output "hello class"', () => {
	const result = greet('class');

	expect(result).toEqual('hello class');
});
