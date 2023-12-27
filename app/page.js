"use client";

import { useContext } from "react";
import Link from "next/link";

import { GameContext } from "@/contexts/GameContextProvider";

export default function Home() {
  const { playerType, setPlayerType, gameType, setGameType } =
    useContext(GameContext);

  const className = `text-xl ${playerType === "X" ? "bg-yellow" : "bg-blue"}`;

  return (
    <>
      <div className="flex gap-4">
        <button className={className} onClick={() => setPlayerType("X")}>
          X
        </button>
        <button className={className} onClick={() => setPlayerType("O")}>
          O
        </button>
      </div>
      <div className="flex flex-col">
        <button onClick={() => setGameType("CPU")}>NEW GAME VS CPU</button>
        <Link href="/game" onClick={() => setGameType("player")}>
          NEW GAME VS PLAYER
        </Link>
      </div>
    </>
  );
}
