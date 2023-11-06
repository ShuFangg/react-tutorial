"use client";

import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import styles from "./toDoList.module.css";
import AddItemBar from "@/app/components/ToDoList/AddItemBar/AddItemBar";
import ItemList from "@/app/components/ToDoList/ItemList/ItemList";
import SearchBar from "@/app/components/ToDoList/SearchBar/SearchBar";
import Skeleton from "@mui/material/Skeleton";

interface Item {
  id: string;
  name: string;
  isComplete: boolean;
  dateTime: Date;
}

const BASE_URL = "https://sf-service.onrender.com";

const ToDoList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterItem, setFilterItem] = useState("all");
  const [sortItem, setSortItem] = useState("ascendingDate");
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetching(true);

      const response = await fetch(`${BASE_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "e6NCwEhWT8pR8K3vhNQcHUadWH96",
        },
      });

      const data = await response.json();
      setItems(data);

      if (!response.ok) {
        alert("Failed to fetch item");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to fetch item");
    }

    setIsFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async (value: string) => {
    const newItem: Item = {
      id: uuid(),
      name: value,
      isComplete: false,
      dateTime: new Date(),
    };

    setItems([...items, newItem]);

    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "post",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          authorization: "e6NCwEhWT8pR8K3vhNQcHUadWH96",
        },
      });

      if (!response.ok) {
        setItems([...items]);
        alert("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
      setItems([...items]);
      alert("Failed to add item");
    }
  };

  const selectedItem = async (id: string, value: boolean) => {
    try {
      const updatedItem = items.map((item) =>
        item.id === id ? { ...item, isComplete: !value } : item
      );
      setItems(updatedItem);

      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isComplete: !value }),
        headers: {
          "Content-Type": "application/json",
          authorization: "e6NCwEhWT8pR8K3vhNQcHUadWH96",
        },
      });

      if (!response.ok) {
        const originalItem = items.find((item) => item.id === id);
        if (originalItem) {
          const rollbackItem = items.map((item) =>
            item.id === id ? originalItem : item
          );
          setItems(rollbackItem);
        }

        alert("Failed to select item");
      }
    } catch (error) {
      console.error("Error:", error);

      const originalItem = items.find((item) => item.id === id);
      if (originalItem) {
        const rollbackItem = items.map((item) =>
          item.id === id ? originalItem : item
        );
        setItems(rollbackItem);
      }

      alert("Failed to select item");
    }
  };

  const updateItem = async (id: string, value: string) => {
    try {
      const editItem = items.map((item) =>
        item.id === id && value !== "" ? { ...item, name: value } : item
      );
      setItems(editItem);

      if (value.trim() !== "") {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ name: value }),
          headers: {
            "Content-Type": "application/json",
            authorization: "e6NCwEhWT8pR8K3vhNQcHUadWH96",
          },
        });

        if (!response.ok) {
          const originalItem = items.find((item) => item.id === id);
          if (originalItem) {
            const rollbackItem = items.map((item) =>
              item.id === id ? originalItem : item
            );

            setItems(rollbackItem);
          }

          alert("Failed to edit item");
        }
      }
    } catch (error) {
      console.error("Error:", error);

      const originalItem = items.find((item) => item.id === id);
      if (originalItem) {
        const rollbackItem = items.map((item) =>
          item.id === id ? originalItem : item
        );
        setItems(rollbackItem);
      }

      alert("Failed to edit item");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const filterDeleteItem = items.filter((item) => item.id !== id);
      setItems(filterDeleteItem);

      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "e6NCwEhWT8pR8K3vhNQcHUadWH96",
        },
      });

      if (!response.ok) {
        const originalItem = items.find((item) => item.id === id);
        if (originalItem) {
          setItems([...items, originalItem]);
        }

        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error: ", error);

      const originalItem = items.find((item) => item.id === id);
      if (originalItem) {
        setItems([...items, originalItem]);
      }

      alert("Failed to delete item");
    }
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
          <SearchBar
            searchItem={searchItem}
            onSearchItem={setSearchItem}
            filterItem={filterItem}
            onFilterItem={setFilterItem}
            sortItem={sortItem}
            onSortItem={setSortItem}
          />
          {isFetching ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              height={300}
              className={styles.skeleton}
            />
          ) : (
            items
              .filter(
                ({ name, isComplete }) =>
                  (searchItem.trim() === "" ||
                    name
                      .toLowerCase()
                      .includes(searchItem.trim().toLowerCase())) &&
                  (filterItem === "all" ||
                    (filterItem === "completed" && isComplete) ||
                    (filterItem === "inProgress" && !isComplete)) &&
                  items.sort((a, b): number => {
                    const dateA = new Date(a.dateTime).valueOf();
                    const dateB = new Date(b.dateTime).valueOf();
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();

                    if (sortItem === "ascendingDate") {
                      return dateA - dateB;
                    } else if (sortItem === "descendingDate") {
                      return dateB - dateA;
                    } else if (sortItem === "ascendingAlphabetic") {
                      return nameA.localeCompare(nameB);
                    } else if (sortItem === "descendingAlphabetic") {
                      return nameB.localeCompare(nameA);
                    }
                    return 0;
                  })
              )
              .map((item) => (
                <ItemList
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  isComplete={item.isComplete}
                  selectedItem={selectedItem}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                />
              ))
          )}
          <AddItemBar addItem={addItem} />
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
