"use client";

import React from "react";
import Board from "./Board";

const TicTacToe: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <Board />
    </div>
  </div>
);

export default TicTacToe;
