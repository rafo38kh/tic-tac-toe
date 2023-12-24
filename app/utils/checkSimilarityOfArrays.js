import isEqual from "lodash/isEqual";

export default function checkSimilarityOfArrays(
  inputedArray,
  combinationsArray
) {
  const sortedInputedArray = inputedArray.slice().sort();

  const finalIndex = combinationsArray.find((subarray) =>
    isEqual(sortedInputedArray, subarray)
  );

  return finalIndex;
}
