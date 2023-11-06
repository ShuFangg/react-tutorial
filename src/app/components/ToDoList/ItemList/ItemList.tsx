import React, { useEffect, useState } from "react";
import styles from "./ItemList.module.css";
import ItemAction from "./components/ItemAction/ItemAction";
import ItemDescription from "./components/ItemDescription/ItemDescription";
import ItemStatus from "./components/ItemStatus/ItemStatus";

interface ItemListProps {
  id: string;
  name: string;
  isComplete: boolean;
  selectedItem: (id: string, checked: boolean) => void;
  updateItem: (id: string, value: string) => void;
  deleteItem: (id: string) => void;
}

const ItemList = ({
  id,
  name,
  isComplete,
  selectedItem,
  updateItem,
  deleteItem,
}: ItemListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(name);
  const [isUpdating, setIsUpdating] = useState(false);
  const [invalidItem, setInvalidItem] = useState(false);

  useEffect(() => {
    setUpdatedItem(name);
  }, [name]);

  const onSelectedItem = async () => {
    setIsSelecting(true);
    await selectedItem(id, isComplete);
    setIsSelecting(false);
  };

  const trimUpdatedItem = updatedItem.trim();

  const onUpdateItem = async () => {
    setIsUpdating(true);

    if (trimUpdatedItem) {
      await updateItem(id, trimUpdatedItem);
      setIsEditing(false);
    } else {
      setInvalidItem(true);
      alert("Failed to edit item. Please fill in item.");
    }

    setIsUpdating(false);
  };

  const onToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onExitEditing = () => {
    setUpdatedItem(name);
    setIsEditing(false);
  };

  const onDeleteItem = () => {
    deleteItem(id);
  };

  const handleEditItem = (value: string) => {
    setUpdatedItem(value);

    if (trimUpdatedItem !== "") {
      setInvalidItem(false);
    }
  };

  return (
    <div className={styles.row}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className={styles.statusColumn}>
        <ItemStatus
          id={id}
          isComplete={isComplete}
          onSelectedItem={onSelectedItem}
          isSelecting={isSelecting}
        />
        <ItemDescription
          id={id}
          isEditing={isEditing}
          isUpdating={isUpdating}
          updatedItem={updatedItem}
          handleEditItem={(value) => handleEditItem(value)}
          onUpdateItem={onUpdateItem}
          onExitEditing={onExitEditing}
        />
      </div>
      <ItemAction
        isEditing={isEditing}
        isUpdating={isUpdating}
        invalidItem={invalidItem}
        onUpdateItem={onUpdateItem}
        onExitEditing={onExitEditing}
        onToggleEditing={onToggleEditing}
        onClickDelete={onDeleteItem}
      />
    </div>
  );
};

export default ItemList;
