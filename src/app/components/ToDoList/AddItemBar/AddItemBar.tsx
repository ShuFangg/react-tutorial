import React, { useState } from "react";
import styles from "./AddItemBar.module.css";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface AddItemBarProps {
  addItem: (value: string) => void;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "15px 10px",
          "min-width": "0px",
        },
      },
    },
  },
});

const AddItemBar = ({ addItem }: AddItemBarProps) => {
  const [newItem, setNewItem] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [invalidItem, setInvalidItem] = useState(false);

  const trimNewItem = newItem.trim();

  const handleEnterInput = (key: string) => {
    if (key === "Enter") {
      onSubmit();
    } else if (key === "Escape") {
      setNewItem("");
    }
  };

  const onSubmit = async () => {
    setIsAdding(true);

    if (trimNewItem !== "") {
      await addItem(trimNewItem);
      setNewItem("");
    } else {
      setInvalidItem(true);
      alert("Failed to add item. Please fill in item.");
    }

    setIsAdding(false);
  };

  const handleNewItem = (value: string) => {
    setNewItem(value);

    if (trimNewItem !== "") {
      setInvalidItem(false);
    }
  };

  return (
    <div className={styles.addItem}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <input
        value={newItem}
        placeholder="Add new item .."
        onChange={(e) => handleNewItem(e.target.value)}
        onKeyDown={(e) => handleEnterInput(e.key)}
        disabled={isAdding}
      />
      {isAdding ? (
        <ThemeProvider theme={theme}>
          <LoadingButton className={styles.loadingButton} loading />
        </ThemeProvider>
      ) : (
        <div
          className={invalidItem ? styles.disabledButton : styles.activeButton}
        >
          <span className="material-icons" onClick={onSubmit}>
            add
          </span>
        </div>
      )}
    </div>
  );
};

export default AddItemBar;
