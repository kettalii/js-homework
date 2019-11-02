/**
 * Utils - Utility functions are generic functions on primitives. Think sum all the elements.
 */

/**
  * 
  * @param { any[] } arr - array to group the elements on
  * @param { any => string } groupFn 
  */
export function groupBy(arr, groupFn) {
	return arr.reduce((accum, next) => {
		// get the key to group on
		const key = (groupFn(next) || 'undefined').toString();

		// add to they keys array, if it doesn't exist, add to empty array
		if (!accum[key]) {
			accum[key] = [];
		}
		accum[key].push(next);

		return accum;
	}, {});
}
