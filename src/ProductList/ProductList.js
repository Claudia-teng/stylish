import Product from "../Product/Product";
import styles from "./ProductList.module.sass";

function ProductList({ products }) {
  return (
    <>
      <div className={styles.list}>
        {!products.length && <p>查無商品</p>}
        {products.map((product, i) => {
          return <Product key={i} product={product} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
