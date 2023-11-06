"use client";

import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import styles from "./toDoList.module.css";
import AddItemBar from "@/app/components/ToDoList/AddItemBar/AddItemBar";
import ItemList from "@/app/components/ToDoList/ItemList/ItemList";
import SearchBar from "@/app/components/ToDoList/SearchBar/SearchBar";

interface Item {
  id: string;
  name: string;
  isComplete: boolean;
  dateTime: Date;
}

const ToDoList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const searchItem = (value: string) => {
    const searchedItem = items.filter(({ name }) =>
      name.toLowerCase().includes(value)
    );

    setItems(searchedItem);
  };

  const addItem = async (value: string) => {
    setItems([
      ...items,
      {
        id: uuid(),
        name: value,
        isComplete: false,
        dateTime: new Date(),
      },
    ]);
  };

  const selectedItem = (id: string, value: boolean) => {
    const selectItem = items.map((item) =>
      item.id === id ? { ...item, isComplete: !value } : item
    );
    setItems(selectItem);
  };

  const updateItem = (id: string, value: string) => {
    const editItem = items.map((item) =>
      item.id === id && value !== "" ? { ...item, name: value } : item
    );
    setItems(editItem);
  };

  const deleteItem = (id: string) => {
    const filterDeleteItem = items.filter((item) => item.id !== id);
    setItems(filterDeleteItem);
  };

  return (
    <div>
      <div className={styles.container}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <h1 className={styles.title}>To Do List</h1>
        <div className={styles.contentContainer}>
          <SearchBar searchItem={searchItem} />
          {items.map((item) => (
            <ItemList
              id={item.id}
              key={item.id}
              name={item.name}
              isComplete={item.isComplete}
              selectedItem={selectedItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          ))}
          <AddItemBar addItem={addItem} />
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
