import { useContext } from "react";

import { GameContext } from "@/contexts/GameContextProvider";

export default function GameScores() {
  const { gamer, score, gameType } = useContext(GameContext);

  return (
    <div className="flex justify-between text-darkNavy">
      <div className="flex flex-col items-center p-3 md:px-4 md:py-1 md:w-28 rounded-lg bg-darkBlue w-24">
        <span className="text-sm font-medium md:text-base">
          {gameType === "VS" && `X ${gamer === "X" ? "(P1)" : "(P2)"}`}
          {gameType === "CPU" && `X ${gamer === "X" ? "(YOU)" : "(CPU)"}`}
        </span>
        <span className="text-xl font-bold md:text-2xl">{score.X}</span>
      </div>
      <div className="flex flex-col items-center p-3 md:px-4 md:py-1 md:w-28 rounded-lg bg-darkSilver w-24">
        <span className="text-sm font-medium md:text-base">TIES</span>
        <span className="text-xl font-bold md:text-2xl">{score.ties}</span>
      </div>
      <div className="flex flex-col items-center p-3 md:px-4 md:py-1 md:w-28 rounded-lg  bg-darkYellow w-24">
        <span className="text-sm font-medium md:text-base">
          {gameType === "VS" && `O ${gamer !== "X" ? "(P1)" : "(P2)"}`}
          {gameType === "CPU" && `O ${gamer !== "X" ? "(YOU)" : "(CPU)"}`}
        </span>
        <span className="text-xl font-bold md:text-2xl">{score.O}</span>
      </div>
    </div>
  );
}
