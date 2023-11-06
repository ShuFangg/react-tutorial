import React from "react";
import styles from "./Square.module.css";

interface Props {
  value: string;
  onSquareClick: () => void;
}

const Square = ({ value, onSquareClick }: Props) => {
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
