export default function createWinningCombinationsArrays(arr) {
  const rows = [];
  const columns = [];
  const leftDiagonal = [];
  const rightDiagonal = [];

  for (let colIndex = 0; colIndex < arr.length; colIndex++) {
    for (let rowindex = 0; rowindex < arr.length; rowindex++) {
      rows.push(arr[colIndex][rowindex]);
      columns.push(arr[rowindex][colIndex]);

      if (colIndex === rowindex) leftDiagonal.push(arr[colIndex][rowindex]);

      if (colIndex + rowindex === arr.length - 1)
        rightDiagonal.push(arr[colIndex][rowindex]);
    }
  }
  const algorithm = [
    ..._.chunk(rows, 3),
    ..._.chunk(columns, 3),
    leftDiagonal,
    rightDiagonal,
  ];

  return algorithm;
}
