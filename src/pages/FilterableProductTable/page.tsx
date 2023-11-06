"use client";

import React, { useState } from "react";
import styles from "./FilterableProductTable.module.css";
import ProductTable from "@/app/components/FilterableProductTable/ProductTable/ProductTable";
import SearchBar from "@/app/components/FilterableProductTable/SearchBar/SearchBar";

const FOODSTOCK = [
  { id: "001", category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  {
    id: "002",
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit",
  },
  {
    id: "003",
    category: "Fruits",
    price: "$2",
    stocked: false,
    name: "Passionfruit",
  },
  {
    id: "004",
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach",
  },
  {
    id: "005",
    category: "Vegetables",
    price: "$4",
    stocked: false,
    name: "Pumpkin",
  },
  {
    id: "006",
    category: "Vegetables",
    price: "$1",
    stocked: true,
    name: "Peas",
  },
  {
    id: "007",
    category: "Meat",
    price: "$10",
    stocked: true,
    name: "Beef",
  },
];

interface Props {
  stock: {
    id: string;
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }[];
}

const FilterableProductTable = () => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.container}>
          <SearchBar
            filterText={filterText}
            onFilterTextChange={setFilterText}
            inStockOnly={inStockOnly}
            onInStockOnlyChange={setInStockOnly}
          />

          <div>
            <ProductTable
              stock={FOODSTOCK}
              filterText={filterText}
              inStockOnly={inStockOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableProductTable;
