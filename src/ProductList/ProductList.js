import Product from "../Product/Product";
import styles from "./ProductList.module.sass";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductList() {
  let params = useParams();
  let category = params.category || "all";

  const [products, setProducts] = useState([]);
  async function getProduct(category) {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/${category}`);
    setProducts(result.data.data);
  }

  useEffect(() => {
    getProduct(category);
  }, [category]);

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
