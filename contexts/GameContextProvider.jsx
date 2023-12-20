"use client";
import { createContext, useState, useMemo } from "react";

export const GameContext = createContext({
  playerType: null,
  setPlayerType: () => {},
  gameType: null,
  setGameType: () => {},
});

export default function GameContextProvider({ children }) {
  const [playerType, setPlayerType] = useState("X");
  const [gameType, setGameType] = useState("CPU");

  const value = useMemo(
    () => ({
      playerType,
      setPlayerType,
      gameType,
      setGameType,
    }),
    [playerType, setPlayerType, gameType, setGameType]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
