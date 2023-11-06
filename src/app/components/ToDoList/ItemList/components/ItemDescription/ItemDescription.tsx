import React, { useState } from "react";
import styles from "./ItemDescription.module.css";

interface ItemDescriptionProps {
  id: string;
  updatedItem: string;
  isEditing: boolean;
  isUpdating: boolean;
  handleEditItem: (value: string) => void;
  onUpdateItem: () => void;
  onExitEditing: () => void;
}

const ItemDescription = ({
  id,
  updatedItem,
  isEditing,
  isUpdating,
  handleEditItem,
  onUpdateItem,
  onExitEditing,
}: ItemDescriptionProps) => {
  const handleOnKeyDown = (key: string) => {
    if (key === "Enter") {
      onUpdateItem();
    } else if (key === "Escape") {
      onExitEditing();
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          className={styles.textinput}
          id={id}
          value={updatedItem}
          onChange={(e) => handleEditItem(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e.key)}
          disabled={isUpdating}
        />
      ) : (
        <p>{updatedItem}</p>
      )}
    </div>
  );
};

export default ItemDescription;
