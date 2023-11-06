import React from "react";
import styles from "./ItemStatus.module.css";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ItemStatusProps {
  id: string;
  isComplete: boolean;
  onSelectedItem: () => void;
  isSelecting: boolean;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0px",
          "min-width": "0px",
        },
      },
    },
  },
});

const ItemStatus = ({
  id,
  isComplete,
  onSelectedItem,
  isSelecting,
}: ItemStatusProps) => {
  return (
    <div>
      {isSelecting ? (
        <ThemeProvider theme={theme}>
          <LoadingButton
            className={styles.loadingButton}
            loading
            variant="outlined"
          />
        </ThemeProvider>
      ) : (
        <input
          type="checkbox"
          className={styles.checkBox}
          id={id}
          checked={isComplete}
          onClick={() => onSelectedItem()}
        />
      )}
    </div>
  );
};

export default ItemStatus;
