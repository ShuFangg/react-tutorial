import React from "react";
import styles from "./SortSelection.module.css";

enum Sort {
  AscendingDate = "ascendingDate",
  DescendingDate = "descendingDate",
  AscendingAlphabetic = "ascendingAlphabetic",
  DescendingAlphabetic = "descendingAlphabetic",
}

const options = [
  { value: Sort.AscendingDate, label: "Asc Date" },
  { value: Sort.DescendingDate, label: "Desc Date" },
  { value: Sort.AscendingAlphabetic, label: "Asc Alphabetic" },
  { value: Sort.DescendingAlphabetic, label: "Desc Alphabetic" },
];

interface SortSelectionProps {
  sortItem: string;
  onSortItem: (value: string) => void;
}

const SortSelection = ({ sortItem, onSortItem }: SortSelectionProps) => {
  return (
    <div>
      <form className={styles.sortBar}>
        <label>Sort</label>
        <select onChange={(e) => onSortItem(e.target.value)} value={sortItem}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SortSelection;
