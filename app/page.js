"use client";

import { useContext } from "react";
import Link from "next/link";

import { GameContext } from "@/contexts/GameContextProvider";

export default function Home() {
  const { gamer, setGameType, setGamer } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center p-6 w-full justify-center max-w-[28.75rem]">
      <svg width="72" height="32" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path
            d="M8.562 1.634 16 9.073l7.438-7.439a3 3 0 0 1 4.243 0l2.685 2.685a3 3 0 0 1 0 4.243L22.927 16l7.439 7.438a3 3 0 0 1 0 4.243l-2.685 2.685a3 3 0 0 1-4.243 0L16 22.927l-7.438 7.439a3 3 0 0 1-4.243 0L1.634 27.68a3 3 0 0 1 0-4.243L9.073 16 1.634 8.562a3 3 0 0 1 0-4.243L4.32 1.634a3 3 0 0 1 4.243 0Z"
            fill="#31C3BD"
          />
          <path
            d="M56.1 0c8.765 0 15.87 7.106 15.87 15.87 0 8.766-7.105 15.871-15.87 15.871-8.765 0-15.87-7.105-15.87-15.87C40.23 7.106 47.334 0 56.1 0Zm0 9.405a6.466 6.466 0 1 0 0 12.931 6.466 6.466 0 0 0 0-12.931Z"
            fill="#F2B137"
            fillRule="nonzero"
          />
        </g>
      </svg>
      <div className="flex flex-col items-center justify-center gap-4 bg-semiDarkNavy rounded-lg p-6 w-full my-8 shadow-[0px_-8px_0px_0px_#10212A_inset]">
        <span className="text-base font-bold">PICK PLAYER 1’S MARK</span>
        <div className="flex items-center justify-center gap-4 bg-darkNavy rounded-lg w-full p-2 ">
          <button
            className={`${
              gamer === "X" ? "bg-darkSilver" : null
            } w-full rounded-lg p-3 flex items-center justify-center`}
            onClick={() => {
              setGamer("X");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fillRule="evenodd"
                d="M31.5569 5.28973L26.7103 0.443061C26.1195 -0.147687 25.1617 -0.147687 24.571 0.443061L16 9.01404L7.42902 0.443061C6.83827 -0.147687 5.88048 -0.147687 5.28973 0.443061L0.443061 5.28973C-0.147687 5.88048 -0.147687 6.83827 0.443061 7.42902L9.01404 16L0.443061 24.571C-0.147687 25.1617 -0.147687 26.1195 0.443061 26.7103L5.28973 31.5569C5.88048 32.1477 6.83827 32.1477 7.42902 31.5569L16 22.986L24.571 31.5569C25.1617 32.1477 26.1195 32.1477 26.7103 31.5569L31.5569 26.7103C32.1477 26.1195 32.1477 25.1617 31.5569 24.571L22.986 16L31.5569 7.42902C32.1477 6.83827 32.1477 5.88048 31.5569 5.28973Z"
                fill={`${gamer === "X" ? "#1A2A33" : "#A8BFC9"}`}
              />
            </svg>
          </button>
          <button
            className={`${
              gamer === "O" ? "bg-darkSilver" : null
            } w-full rounded-lg p-3 flex items-center justify-center`}
            onClick={() => {
              setGamer("O");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.7412 15.8706C31.7412 7.10551 24.6357 0 15.8706 0C7.10551 0 0 7.10551 0 15.8706C0 24.6357 7.10551 31.7412 15.8706 31.7412C24.6357 31.7412 31.7412 24.6357 31.7412 15.8706ZM9.4048 15.8706C9.4048 12.2996 12.2996 9.4048 15.8706 9.4048C19.4416 9.4048 22.3364 12.2996 22.3364 15.8706C22.3364 19.4416 19.4416 22.3364 15.8706 22.3364C12.2996 22.3364 9.4048 19.4416 9.4048 15.8706Z"
                fill={`${gamer === "O" ? "#1A2A33" : "#A8BFC9"}`}
              />
            </svg>
          </button>
        </div>
        <span className="text-sm">REMEMBER : X GOES FIRST</span>
      </div>
      <div className="flex flex-col w-full">
        <Link
          className=" bg-darkYellow text-darkNavy text-base font-bold p-3 rounded-lg text-center mb-4 shadow-[0px_-8px_0px_0px_#CC8B13_inset]"
          href="/game"
          onClick={() => setGameType("CPU")}
        >
          NEW GAME VS CPU
        </Link>
        <Link
          className=" bg-darkBlue text-darkNavy text-base font-bold p-3 rounded-lg text-center shadow-[0px_-8px_0px_0px_#118C87_inset]"
          href="/game"
          onClick={() => setGameType("VS")}
        >
          NEW GAME VS PLAYER
        </Link>
      </div>
    </div>
  );
}
