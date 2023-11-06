import React from "react";
import styles from "./SearchBar.module.css";
import SearchInput from "./components/SearchInput/SearchInput";
import SearchSelection from "./components/SearchSelection/SearchSelection";

interface SearchBarProps {
  searchItem: string;
  onSearchItem: (value: string) => void;
  filterItem: string;
  onFilterItem: (value: string) => void;
  sortItem: string;
  onSortItem: (value: string) => void;
}

const SearchBar = ({
  searchItem,
  onSearchItem,
  filterItem,
  onFilterItem,
  sortItem,
  onSortItem,
}: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputContainer}>
        <SearchInput searchItem={searchItem} onSearchItem={onSearchItem} />
      </div>
      <div className={styles.searchSelectionContainer}>
        <SearchSelection
          filterItem={filterItem}
          onFilterItem={onFilterItem}
          sortItem={sortItem}
          onSortItem={onSortItem}
        />
      </div>
    </div>
  );
};

export default SearchBar;
