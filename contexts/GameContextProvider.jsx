"use client";
import { createContext, useState, useMemo } from "react";

export const GameContext = createContext({
  playerType: null,
  setPlayerType: () => {},
  gameType: null,
  setGameType: () => {},
  winner: null,
  setWinner: () => {},
  gameBoard: null,
  setGameBoard: () => {},
  crossIndex: null,
  setCrossIndex: () => {},
  circleIndex: null,
  setCircleIndex: () => {},
  score: null,
  setScore: () => {},
  isResetting: null,
  setIsResetting: () => {},
  winnerIndices: null,
  setWinnerIndices: () => {},
  gamer: null,
  setGamer: () => {},
  resetGame: () => {},
});

export default function GameContextProvider({ children }) {
  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gamer, setGamer] = useState("X");
  const [winner, setWinner] = useState("");
  const [gameType, setGameType] = useState("VS");
  const [crossIndex, setCrossIndex] = useState([]);
  const [playerType, setPlayerType] = useState("X");
  const [circleIndex, setCircleIndex] = useState([]);
  const [isResetting, setIsResetting] = useState(false);
  const [winnerIndices, setWinnerIndices] = useState([]);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    ties: 0,
  });

  const resetGame = (setIsModalOpen) => {
    setGamer("X");
    setWinner("");
    setPlayerType("X");
    setCrossIndex([]);
    setCircleIndex([]);
    setWinnerIndices([]);
    setIsModalOpen();
    setGameBoard(initialGameBoard);
  };

  const value = useMemo(
    () => ({
      playerType,
      setPlayerType,
      gameType,
      setGameType,
      winner,
      setWinner,
      gameBoard,
      setGameBoard,
      crossIndex,
      setCrossIndex,
      circleIndex,
      setCircleIndex,
      score,
      setScore,
      isResetting,
      setIsResetting,
      winnerIndices,
      setWinnerIndices,
      gamer,
      setGamer,
      resetGame,
    }),
    [
      playerType,
      setPlayerType,
      gameType,
      setGameType,
      winner,
      setWinner,
      gameBoard,
      setGameBoard,
      crossIndex,
      setCrossIndex,
      circleIndex,
      setCircleIndex,
      score,
      setScore,
      isResetting,
      setIsResetting,
      winnerIndices,
      setWinnerIndices,
      gamer,
      setGamer,
      resetGame,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
