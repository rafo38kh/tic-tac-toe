// }
import { isEqual } from "lodash";

function chunkArray(array, chunkSize) {
  function helper(current, index) {
    if (current.length === chunkSize) {
      combinations.push([...current]);
      return;
    }

    for (let i = index; i < array.length; i++) {
      helper([...current, array[i]], i + 1);
    }
  }

  const combinations = [];
  helper([], 0);
  return combinations;
}

export default function checkSimilarityOfArrays(
  inputedArray,
  combinationsArray
) {
  const sortedInputedArray = inputedArray.slice().sort();

  const inputedArrayCombinations = chunkArray(sortedInputedArray, 3);

  for (const subarray of inputedArrayCombinations) {
    const foundArray = combinationsArray.find((combination) =>
      isEqual(combination, subarray)
    );

    if (foundArray !== undefined) {
      return true;
    }
  }

  return false;
}
