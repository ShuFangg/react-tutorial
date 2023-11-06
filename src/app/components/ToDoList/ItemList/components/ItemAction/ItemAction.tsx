import React from "react";
import styles from "./ItemAction.module.css";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ItemActionProps {
  isEditing: boolean;
  isUpdating: boolean;
  invalidItem: boolean;
  onUpdateItem: () => void;
  onExitEditing: () => void;
  onToggleEditing: () => void;
  onClickDelete: () => void;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "15px 13px",
          "min-width": "0px",
        },
      },
    },
  },
});

const ItemAction = ({
  isEditing,
  isUpdating,
  invalidItem,
  onUpdateItem,
  onExitEditing,
  onToggleEditing,
  onClickDelete,
}: ItemActionProps) => {
  return (
    <div className={styles.actionColumn}>
      {isEditing ? (
        isUpdating ? (
          <ThemeProvider theme={theme}>
            <LoadingButton
              className={styles.loadingButton}
              variant="outlined"
              loading
            />
          </ThemeProvider>
        ) : (
          <div
            className={
              invalidItem ? styles.disabledEditColumn : styles.editColumn
            }
          >
            <button onClick={onUpdateItem}>
              <span className="material-icons">done</span>
            </button>
            <button onClick={onExitEditing}>
              <span className="material-icons">close</span>
            </button>
          </div>
        )
      ) : (
        <button onClick={onToggleEditing}>
          <span className="material-icons">edit</span>
        </button>
      )}
      <button onClick={onClickDelete}>
        <span className="material-icons">delete</span>
      </button>
    </div>
  );
};

export default ItemAction;
