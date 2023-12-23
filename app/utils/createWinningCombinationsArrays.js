export default function createWinningCombinationsArrays(arr) {
  const rows = [];
  const columns = [];
  const leftDiagonal = [];
  const rightDiagonal = [];

  for (let colIndex = 0; colIndex < arr.length; colIndex++) {
    for (let rowindex = 0; rowindex < arr.length; rowindex++) {
      rows.push(arr[rowindex][colIndex]);
      columns.push(arr[colIndex][rowindex]);

      if (colIndex === rowindex) leftDiagonal.push(arr[colIndex][rowindex]);

      if (colIndex + rowindex === arr.length - 1)
        rightDiagonal.push(arr[colIndex][rowindex]);
    }
  }

  return {
    rows,
    columns,
    leftDiagonal,
    rightDiagonal,
  };
}
