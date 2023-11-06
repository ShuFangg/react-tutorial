import React from "react";
import styles from "./FilterSelection.module.css";

enum Filter {
  All = "all",
  Completed = "completed",
  InProgress = "inProgress",
}

const options = [
  { value: Filter.All, label: "All" },
  { value: Filter.Completed, label: "Completed" },
  { value: Filter.InProgress, label: "Not Complete" },
];

interface FilterSelectionProps {
  filterItem: string;
  onFilterItem: (value: string) => void;
}

const FilterSelection = ({
  filterItem,
  onFilterItem,
}: FilterSelectionProps) => {
  return (
    <div>
      <form className={styles.filterBar}>
        <label>Filter</label>
        <select
          onChange={(e) => onFilterItem(e.target.value)}
          value={filterItem}
        >
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

export default FilterSelection;
