"use client";
import { useState, useEffect, useContext } from "react";
import * as _ from "lodash";

import { GameContext } from "@/contexts/GameContextProvider";

import createWinningCombinationsArrays from "@/app/utils/createWinningCombinationsArrays";
import checkSimilarityOfArrays from "@/app/utils/checkSimilarityOfArrays";
import Modal from "./Modal";
import TopElements from "./TopElements";
import GameScores from "./GameScores";

export default function GamePage() {
  const {
    gamer,
    winner,
    setScore,
    gameType,
    setWinner,
    gameBoard,
    playerType,
    crossIndex,
    circleIndex,
    setGameBoard,
    setPlayerType,
    setCrossIndex,
    winnerIndices,
    setCircleIndex,
    setWinnerIndices,
  } = useContext(GameContext);

  const [isDisabled, setIsDisabled] = useState(false);

  const makeComputerMove = () => {
    if (playerType === "O" && !winner) {
      const emptyCells = gameBoard
        .flat()
        .filter((cell) => typeof cell === "number");

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const chosenCell = emptyCells[randomIndex];

        const row = Math.floor((chosenCell - 1) / 3);
        const column = (chosenCell - 1) % 3;

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
      }
    }

    if (gameType === "CPU") {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (gameType === "CPU") {
      timeoutId = setTimeout(() => {
        makeComputerMove();
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    playerType,
    winner,
    gameBoard,
    crossIndex,
    circleIndex,
    winnerIndices,
    makeComputerMove,
  ]);

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

    if (gameType === "CPU") {
      setIsDisabled(true);
    }
  };

  const isWinningCell = (rowIndex, columnIndex) => {
    const cellIndex = rowIndex * 3 + columnIndex + 1;
    return winnerIndices.includes(cellIndex);
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
      setWinnerIndices(crossWin);
      setPlayerType("X");
    } else if (circleWin && !crossWin) {
      setWinner("O");
      setIsModalOpen(true);
      setWinnerIndices(circleWin);
      setPlayerType("X");
    } else if (isTie) {
      setWinner("TIES");
      setIsModalOpen(true);
      setPlayerType("X");
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

  return (
    <div className="w-full p-6 max-w-[28.75rem] min-h-screen md:flex md:flex-col md:justify-center">
      <TopElements setIsModalOpen={setIsModalOpen} />
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between mb-5">
          {row.map((cell, columnIndex) => (
            <div key={columnIndex} className="">
              <button
                type="button"
                disabled={typeof cell === "string" || isDisabled}
                onClick={() => {
                  handleGameBoardClick(cell);
                }}
                className={`rounded-lg p-4 w-24 h-24  text-white  text-center shadow-[0px_-8px_0px_0px_#10212A_inset] md:w-28 md:h-28 flex justify-center items-center ${
                  isWinningCell(rowIndex, columnIndex)
                    ? winner === "X"
                      ? "bg-darkBlue"
                      : "bg-darkYellow"
                    : "bg-semiDarkNavy"
                } `}
              >
                {typeof cell === "number" ? (
                  ""
                ) : cell === "X" ? (
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                      fill={
                        isWinningCell(rowIndex, columnIndex)
                          ? "#1A2A33"
                          : "#31C3BD"
                      }
                      fillRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                      fill={
                        isWinningCell(rowIndex, columnIndex)
                          ? "#1A2A33"
                          : "#F2B137"
                      }
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      ))}

      <GameScores />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
