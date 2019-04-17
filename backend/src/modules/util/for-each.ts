/**
 * Iterates over an array and executes the function.
 *
 * Optionally you can break out of the iteration by (return false).
 */
export const ForEach = <T>(
  array: T[],
  func: (element: T) => boolean | void,
): void => {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (func(array[i]) === false) {
      break;
    }
  }
};
/**
 * Backwards iteration over an array and executes the function. Optionally you can break out of the iteration by (return false).
 */
export const ForEachBackwards = <T>(
  arr: T[],
  func: (element: T) => boolean | void,
): void => {
  for (let i = arr.length - 1; 0 <= i; i--) {
    if (func(arr[i]) === false) {
      break;
    }
  }
};
