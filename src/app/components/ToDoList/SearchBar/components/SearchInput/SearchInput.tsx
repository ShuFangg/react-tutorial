import React, { useState } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  searchItem: string;
  onSearchItem: (value: string) => void;
}

const SearchInput = ({ searchItem, onSearchItem }: SearchInputProps) => {
  return (
    <div className={styles.searchItem}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <input
        value={searchItem}
        placeholder="Search .."
        onChange={(e) => onSearchItem(e.target.value)}
      />
      <span className="material-icons">search</span>
    </div>
  );
};

export default SearchInput;
