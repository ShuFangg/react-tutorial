import React from "react";
import styles from "./Board.module.css";
import Square from "../Square/Square";

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

interface Props {
  xIsNext: boolean;
  squares: string[];
  onPlay: (value: string[]) => void;
}

const Board = ({ xIsNext, squares, onPlay }: Props) => {
  const winner = calculateWinner(squares);

  const handleClick = (value: number) => {
    if (!squares[value] && !calculateWinner(squares)) {
      const nextSquares = squares.slice();
      nextSquares[value] = xIsNext ? "X" : "O";
      onPlay(nextSquares);
    }
  };

  return (
    <div>
      <div className={styles.status}>
        {winner
          ? "Winner : " + winner
          : squares.every((value) => value === null)
          ? "Game start"
          : squares.every((value) => value !== null)
          ? "Draw"
          : "Next player is: " + (xIsNext ? "X" : "O")}
      </div>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

export default Board;
