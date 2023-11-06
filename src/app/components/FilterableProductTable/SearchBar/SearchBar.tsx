import styles from "./SearchBar.module.css";

interface Props {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (checked: boolean) => void;
}

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: Props) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.searchContainer}
        placeholder="Search..."
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
      ></input>
      <div className={styles.inStockContainer}>
        <input
          type="checkbox"
          checked={inStockOnly}
          className={styles.inStockBox}
          onChange={() => onInStockOnlyChange(!inStockOnly)}
        ></input>
        <div>Only show products in stock</div>
      </div>
    </div>
  );
};

export default SearchBar;
