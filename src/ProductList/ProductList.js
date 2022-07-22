import Product from "../Product/Product";
import styles from "./ProductList.module.sass";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <>
      <div className={styles.list}>
        {!products?.length && <p>查無商品</p>}
        {products?.map((product, i) => {
          return (
            <Link key={i} to={`/product?id=${product.id}`}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
