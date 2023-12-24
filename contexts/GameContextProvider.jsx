"use client";
import { createContext, useState, useMemo } from "react";

export const GameContext = createContext({
  playerType: null,
  setPlayerType: () => {},
  gameType: null,
  setGameType: () => {},
  winner: null,
  setWinner: () => {},
});

export default function GameContextProvider({ children }) {
  const [winner, setWinner] = useState("");
  const [gameType, setGameType] = useState("CPU");
  const [playerType, setPlayerType] = useState("X");

  const value = useMemo(
    () => ({
      playerType,
      setPlayerType,
      gameType,
      setGameType,
      winner,
      setWinner,
    }),
    [playerType, setPlayerType, gameType, setGameType, winner, setWinner]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
