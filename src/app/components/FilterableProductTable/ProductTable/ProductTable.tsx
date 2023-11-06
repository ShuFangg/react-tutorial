import ProductCategoryRow from "./components/ProductCategoryRow";
import ProductRow from "./components/ProductRow";
import styles from "./ProductTable.module.css";

interface Props {
  filterText: string;
  inStockOnly: boolean;
  stock: {
    id: string;
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }[];
}

const ProductTable = ({ filterText, inStockOnly, stock }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div>Name</div>
        <div>Price</div>
      </div>
      <div>
        {[...new Set(stock.map(({ category }) => category))].map(
          (stockCategory) => (
            <div>
              <ProductCategoryRow category={stockCategory} />
              {stock
                .filter(
                  ({ name, stocked, category }) =>
                    stockCategory === category &&
                    (filterText.trim() === "" ||
                      name
                        .toLowerCase()
                        .includes(filterText.trim().toLowerCase())) &&
                    (!inStockOnly || stocked === inStockOnly)
                )
                .map(({ id, price, stocked, name }) => (
                  <div key={id}>
                    <ProductRow name={name} price={price} stocked={stocked} />
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductTable;
