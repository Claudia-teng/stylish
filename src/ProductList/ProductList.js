import Product from "../Product/Product";
import styles from "./ProductList.module.sass";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  async function getProduct() {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/all`);
    setProducts(result.data.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className={styles.list}>
        {products.map((product, i) => {
          return <Product key={i} product={product} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
