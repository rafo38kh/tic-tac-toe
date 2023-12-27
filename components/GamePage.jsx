"use client";
import { useState, useEffect, useContext } from "react";
import * as _ from "lodash";

import { GameContext } from "@/contexts/GameContextProvider";

import createWinningCombinationsArrays from "@/app/utils/createWinningCombinationsArrays";
import checkSimilarityOfArrays from "@/app/utils/checkSimilarityOfArrays";
import Modal from "./Modal";

export default function GamePage() {
  const {
    winner,
    setWinner,
    playerType,
    setPlayerType,
    gameBoard,
    setGameBoard,
    crossIndex,
    setCrossIndex,
    circleIndex,
    score,
    setScore,
    setCircleIndex,
    setIsResetting,
  } = useContext(GameContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

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

  const algorithm = createWinningCombinationsArrays(initialGameBoard);

  useEffect(() => {
    const crossWin = checkSimilarityOfArrays(crossIndex, algorithm);
    const circleWin = checkSimilarityOfArrays(circleIndex, algorithm);

    const isTie = gameBoard.every((row) =>
      row.every((cell) => typeof cell === "string")
    );

    if (crossWin && !circleWin) {
      setWinner("X");
      setIsModalOpen(true);
    } else if (circleWin && !crossWin) {
      setWinner("O");
      setIsModalOpen(true);
    } else if (isTie) {
      setWinner("TIES");
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [gameBoard]);

  useEffect(() => {
    if (winner === "X") {
      setScore((prevState) => ({ ...prevState, X: prevState.X + 1 }));
    } else if (winner === "O") {
      setScore((prevState) => ({ ...prevState, O: prevState.O + 1 }));
    } else if (winner === "TIES") {
      setScore((prevState) => ({ ...prevState, ties: prevState.ties + 1 }));
    }
  }, [winner]);

  const resetModalOpen = () => {
    setIsResetting(true);
    setIsModalOpen(true);
  };

  return (
    <div>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-4 mb-4">
          {row.map((cell, columnIndex) => (
            <div key={columnIndex} className="flex gap-4">
              <button
                type="button"
                disabled={typeof cell === "string"}
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

      <button type="button" onClick={() => resetModalOpen()}>
        reset
      </button>

      <span>{playerType} turn</span>

      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <span>X {playerType === "X" ? "(YOU)" : "(CPU)"}</span>
          <span>{score.X}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>TIES</span>
          <span>{score.ties}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>O {playerType !== "X" ? "(YOU)" : "(CPU)"}</span>
          <span>{score.O}</span>
        </div>
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
