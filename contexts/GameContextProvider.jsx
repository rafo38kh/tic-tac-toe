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
});

export default function GameContextProvider({ children }) {
  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [winner, setWinner] = useState("");
  const [gameType, setGameType] = useState("CPU");
  const [crossIndex, setCrossIndex] = useState([]);
  const [playerType, setPlayerType] = useState("X");
  const [circleIndex, setCircleIndex] = useState([]);
  const [isResetting, setIsResetting] = useState(false);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    ties: 0,
  });

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
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
