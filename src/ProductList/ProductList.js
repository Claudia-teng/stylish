import Product from "../Product/Product";
import styles from "./ProductList.module.sass";

function ProductList() {
  return (
    <>
      <div className={styles.list}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </>
  );
}

export default ProductList;
