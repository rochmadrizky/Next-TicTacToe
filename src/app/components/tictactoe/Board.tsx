import React, { useState, useEffect } from "react";
import Square from "./Square";

const SQUARE_EMPTY = "";
const SQUARE_X = "X";
const SQUARE_O = "O";

const calculateWinner = (squares: string[]): string | null => {
  const winningLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Check for draw
  if (!squares.includes(SQUARE_EMPTY)) {
    return "Draw";
  }

  return null;
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(SQUARE_EMPTY));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = (i: number) => {
    if (!gameStarted || calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = SQUARE_X;
    setSquares(newSquares);
    setXIsNext(false);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(SQUARE_EMPTY));
    setXIsNext(true);
    setGameStarted(false);
  };

  useEffect(() => {
    if (!xIsNext && gameStarted) {
      const timer = setTimeout(() => {
        const emptySquares = squares.reduce<number[]>((acc, el, index) => {
          if (el === SQUARE_EMPTY) {
            acc.push(index);
          }
          return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const newSquares = [...squares];
        newSquares[emptySquares[randomIndex]] = SQUARE_O;
        setSquares(newSquares);
        setXIsNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, squares, gameStarted]);

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const winner = calculateWinner(squares);

  return (
    <div>
      <div className="grid grid-cols-3 my-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-24 h-24">
            {renderSquare(i)}
          </div>
        ))}
      </div>
      <div className="col-span-3">
        {gameStarted ? (
          <span>
            {winner ? `Pemenang: ${winner}` : `Pemain: ${xIsNext ? "X" : "O"}`}
          </span>
        ) : (
          <span>Klik 'Mulai Game' untuk memulai!</span>
        )}
      </div>
      {!gameStarted && (
        <button
          onClick={handleStart}
          className="py-1 px-2 bg-blue-200 rounded-md"
        >
          Mulai Game
        </button>
      )}
      {(winner || winner === "Draw") && (
        <button
          onClick={handleReset}
          className="py-1 px-2 bg-green-200 rounded-md"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default Board;
