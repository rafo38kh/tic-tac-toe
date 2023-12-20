import { createContext, useState, useMemo } from "react";

export const TypeOfPlayerContext = createContext({
  playerType: null,
  setPlayerType: () => {},
});

export default function TypeOfPlayerContextProvider({ children }) {
  const [playerType, setPlayerType] = useState("X");

  const value = useMemo(
    () => ({
      playerType,
      setPlayerType,
    }),
    [playerType, setPlayerType]
  );

  return (
    <TypeOfPlayerContext.Provider value={value}>
      {children}
    </TypeOfPlayerContext.Provider>
  );
}
