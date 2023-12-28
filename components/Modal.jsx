"use client";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useContext } from "react";

import { GameContext } from "@/contexts/GameContextProvider";

export default function Modal({ setIsModalOpen }) {
  const {
    winner,
    setWinner,
    setGameBoard,
    setCrossIndex,
    setCircleIndex,
    setScore,
    isResetting,
    setIsResetting,
    setWinnerIndices,
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
    setWinnerIndices([]);
    setIsModalOpen(false);
    setGameBoard(initialGameBoard);
  };

  return createPortal(
    <div className="h-screen w-full fixed inset-0 bg-black/50 flex flex-col justify-center items-center ">
      <div className="bg-semiDarkNavy/50 backdrop-blur-md w-full flex flex-col justify-center items-center gap-6 px-8 py-14 ">
        {isResetting ? (
          <span className="text-darkSilver text-2xl font-bold">
            Restart Game?{" "}
          </span>
        ) : (
          <>
            <span className="text-sm">OH NO, YOU LOST…</span>
            <span
              className={`text-darkSilver text-2xl font-bold flex justify-center items-center
              ${winner === "X" ? "text-darkBlue" : null}
              ${winner === "O" ? "text-darkYellow" : null}
              ${winner === "TIES" ? "text-darkSilver" : null}`}
            >
              {winner === "X" && (
                <svg
                  className="scale-50"
                  width="64"
                  height="64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                    fill="#31C3BD"
                    fillRule="evenodd"
                  />
                </svg>
              )}
              {winner === "O" && (
                <svg
                  className="scale-50"
                  width="64"
                  height="64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                    fill="#F2B137"
                  />
                </svg>
              )}
              {winner === "X" || winner === "O"
                ? "TAKES THE ROUND"
                : "ROUND TIED"}
            </span>
          </>
        )}

        {isResetting ? (
          <div className="flex gap-4">
            <button
              className="text-base text-darkNavy rounded-lg uppercase font-bold bg-darkSilver p-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
              type="button"
              onClick={() => {
                setIsResetting(false);
                setIsModalOpen(false);
              }}
            >
              No, cancel
            </button>
            <button
              className="text-base text-darkNavy rounded-lg uppercase font-bold bg-darkYellow p-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
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
              className="text-base text-darkNavy rounded-lg uppercase font-bold bg-darkSilver p-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
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
            <button
              className="text-base text-darkNavy rounded-lg uppercase font-bold bg-darkYellow p-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
              type="button"
              onClick={handleNextRoundClick}
            >
              NEXT ROUND
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
