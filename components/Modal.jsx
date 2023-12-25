"use client";
import { createPortal } from "react-dom";
import { useContext, useState } from "react";

import { GameContext } from "@/contexts/GameContextProvider";

export default function Modal({ setIsModalOpen }) {
  const { winner } = useContext(GameContext);

  return createPortal(
    <div className="h-screen w-full fixed inset-0 bg-black/50 flex flex-col justify-center items-center px-4">
      <div className="text-white">
        <span>OH NO, YOU LOST…</span>
        <span>{winner === "X" ? "X" : "O"} TAKES THE ROUND</span>
        <div className="flex gap-4">
          <button type="button" onClick={() => setIsModalOpen(false)}>
            QUIT
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
