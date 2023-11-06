import React from "react";
import styles from "./SearchSelection.module.css";
import FilterSelection from "./components/FilterSelection/FilterSelection";
import SortSelection from "./components/SortSelection/SortSelection";

interface SearchSelectionProps {
  filterItem: string;
  onFilterItem: (value: string) => void;
  sortItem: string;
  onSortItem: (value: string) => void;
}

const SearchSelection = ({
  filterItem,
  onFilterItem,
  sortItem,
  onSortItem,
}: SearchSelectionProps) => {
  return (
    <div className={styles.searchSelection}>
      <FilterSelection filterItem={filterItem} onFilterItem={onFilterItem} />
      <SortSelection sortItem={sortItem} onSortItem={onSortItem} />
    </div>
  );
};

export default SearchSelection;
