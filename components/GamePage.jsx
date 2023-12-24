"use client";
import { useState, useEffect, useContext } from "react";

import * as _ from "lodash";

import { GameContext } from "@/contexts/GameContextProvider";

import createWinningCombinationsArrays from "@/app/utils/createWinningCombinationsArrays";
import checkSimilarityOfArrays from "@/app/utils/checkSimilarityOfArrays";
import Modal from "./Modal";

export default function GamePage() {
  const { playerType, setPlayerType, gameType, setGameType, setWinner } =
    useContext(GameContext);

  const [crossIndex, setCrossIndex] = useState([]);
  const [circleIndex, setCircleIndex] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleGameBoardClick = (cell) => {
    const row = Math.floor((cell - 1) / 3);
    const column = (cell - 1) % 3;

    if (playerType === "X") {
      setCrossIndex((prevState) => [
        ...prevState,
        initialGameBoard[row][column],
      ]);
    } else {
      setCircleIndex((prevState) => [
        ...prevState,
        initialGameBoard[row][column],
      ]);
    }

    const newGameBoard = [...gameBoard];
    newGameBoard[row][column] = playerType;
    setGameBoard(newGameBoard);
    setPlayerType((prevPlayerType) => (prevPlayerType === "X" ? "O" : "X"));
  };

  const { rows, columns, leftDiagonal, rightDiagonal } =
    createWinningCombinationsArrays(initialGameBoard);

  useEffect(() => {
    const algorithm = [
      ..._.chunk(rows, 3),
      ..._.chunk(columns, 3),
      leftDiagonal,
      rightDiagonal,
    ];
    const crossWin = checkSimilarityOfArrays(crossIndex, algorithm);
    console.log(crossWin);

    if (crossWin) {
      setWinner("X");
      setIsModalOpen(true);
    }
  }, [crossIndex]);

  useEffect(() => {
    const algorithm = [
      ..._.chunk(rows, 3),
      ..._.chunk(columns, 3),
      leftDiagonal,
      rightDiagonal,
    ];
    const circleWin = checkSimilarityOfArrays(circleIndex, algorithm);

    console.log(circleWin);
    if (circleWin) {
      setWinner("O");
      setIsModalOpen(true);
    }
  }, [circleIndex]);

  return (
    <div>
      {gameBoard.map((row, rowIndex) => (
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
      ))}

      <button type="button" onClick={() => setIsModalOpen(true)}>
        reset
      </button>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
