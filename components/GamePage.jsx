"use client";
import { useState, useEffect, useContext } from "react";

import { GameContext } from "@/contexts/GameContextProvider";

import createWinningCombinationsArrays from "@/app/utils/createWinningCombinationsArrays";
import splitArrayIntoChunks from "@/app/utils/splitArrayIntoChunks";

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

  useEffect(() => {
    const { rows, columns, leftDiagonal, rightDiagonal } =
      createWinningCombinationsArrays(gameBoard);

    console.log("rowChunks", splitArrayIntoChunks(rows));
    console.log("columnsChunks", splitArrayIntoChunks(columns));
    console.log(leftDiagonal, rightDiagonal);
  }, []);

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
