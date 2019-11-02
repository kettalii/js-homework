
/**
 * 
 * @param number num - 
 */
export default function fibonacci(num) {
	switch (num) {
	case 0:
	case 1:
		return num;
	default:
		return fibonacci(num - 1) + fibonacci(num - 2);
	}
}
