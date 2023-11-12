import React from "react";
import { useState } from "react";
import styles from "./TicTacToe.module.css";
import Board from "@/app/components/TicTacToe/Board/Board";

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [gameInfo, setGameInfo] = useState(false);

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    nextMove === 0 && setHistory([Array(9).fill(null)]);
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    return (
      <li className={styles.infoLine} key={move}>
        <button className={styles.button} onClick={() => jumpTo(move)}>
          {move > 0 ? "Go to move #" + move : "Game start"}
        </button>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className={styles.game}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={styles.gameInfo}>
        <div className={styles.gameInfoTitle}>
          <p>Game move:</p>
          <span
            className="material-icons"
            onClick={() => setGameInfo(!gameInfo)}
          >
            {gameInfo ? "expand_more" : "expand_less"}
          </span>
        </div>
        <div>{gameInfo ? <ol>{moves}</ol> : ""}</div>
      </div>
    </div>
  );
};

export default TicTacToe;
