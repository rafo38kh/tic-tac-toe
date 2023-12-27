"use client";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useContext } from "react";

import { GameContext } from "@/contexts/GameContextProvider";

export default function Modal({ setIsModalOpen }) {
  const {
    winner,
    gameBoard,
    setWinner,
    playerType,
    setGameBoard,
    setCrossIndex,
    setCircleIndex,
    setScore,
    isResetting,
    setIsResetting,
  } = useContext(GameContext);

  const initialGameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const handleNextRoundClick = () => {
    setWinner("");
    setCrossIndex([]);
    setCircleIndex([]);
    setIsModalOpen(false);
    setGameBoard(initialGameBoard);
  };

  return createPortal(
    <div className="h-screen w-full fixed inset-0 bg-black/50 flex flex-col justify-center items-center px-4">
      <div className="text-white">
        {isResetting ? (
          <span>Restart Game? </span>
        ) : (
          <>
            <span>OH NO, YOU LOST…</span>
            <span>{winner === "X" ? "X" : "O"} TAKES THE ROUND</span>
          </>
        )}

        {isResetting ? (
          <div>
            <button
              type="button"
              onClick={() => {
                setIsResetting(false);
                setIsModalOpen(false);
              }}
            >
              No, cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleNextRoundClick();
                setIsResetting(false);
              }}
            >
              yes, restart
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="../"
              type="button"
              onClick={() => {
                handleNextRoundClick();
                setScore({
                  X: 0,
                  O: 0,
                  ties: 0,
                });
              }}
            >
              QUIT
            </Link>
            <button type="button" onClick={handleNextRoundClick}>
              NEXT ROUND
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
