"use client";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "@/contexts/GameContextProvider";

export default function GamePage() {
  const { playerType, setPlayerType, gameType, setGameType } =
    useContext(GameContext);

  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleGameBoardClick = (cell) => {
    const row = Math.floor((cell - 1) / 3);
    const column = (cell - 1) % 3;

    const newGameBoard = [...gameBoard];

    newGameBoard[row][column] = playerType;

    setGameBoard(newGameBoard);

    setPlayerType((prevPlayerType) => (prevPlayerType === "X" ? "O" : "X"));
  };

  const rows = [];
  const columns = [];
  const leftdiagonal = [];
  const rightdiagonal = [];

  useEffect(() => {
    for (let colIndex = 0; colIndex < gameBoard.length; colIndex++) {
      for (let rowindex = 0; rowindex < gameBoard.length; rowindex++) {
        rows.push(gameBoard[rowindex][colIndex]);
        columns.push(gameBoard[colIndex][rowindex]);

        if (colIndex === rowindex)
          leftdiagonal.push(gameBoard[colIndex][rowindex]);

        if (colIndex + rowindex === gameBoard.length - 1)
          rightdiagonal.push(gameBoard[colIndex][rowindex]);
      }
    }
  }, []);

  console.log(rows, columns, leftdiagonal, rightdiagonal);

  return gameBoard.map((row, rowIndex) => (
    <div key={rowIndex} className="flex flex-row gap-4 mb-4">
      {row.map((cell, columnIndex) => (
        <div key={columnIndex} className="flex gap-4">
          <button
            onClick={() => {
              handleGameBoardClick(cell);
            }}
            className="p-4 bg-black text-white h-8 w-8 text-center"
          >
            {typeof cell === "number" ? "" : cell}
          </button>
        </div>
      ))}
    </div>
  ));
}
