import styles from "./ProductCategoryRow.module.css";

interface Props {
  category: string;
}

const ProductCategoryRow = ({ category }: Props) => {
  return <div className={styles.title}>{category}</div>;
};

export default ProductCategoryRow;
