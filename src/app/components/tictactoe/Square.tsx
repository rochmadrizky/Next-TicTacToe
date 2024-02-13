import React from "react";

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    className="w-24 h-24 text-4xl font-bold border border-black"
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;
