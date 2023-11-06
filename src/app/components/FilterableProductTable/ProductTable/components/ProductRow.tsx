import styles from "./ProductRow.module.css";

interface Props {
  name: string;
  price: string;
  stocked: boolean;
}

const ProductRow = ({ name, price, stocked }: Props) => {
  return (
    <div>
      <div className={styles.inline}>
        <div className={stocked ? styles.nameText : styles.activeNameText}>
          {name}
        </div>
        <div className={styles.priceText}>{price}</div>
      </div>
    </div>
  );
};

export default ProductRow;
