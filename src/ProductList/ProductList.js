import Product from "../Product/Product";
import styles from "./ProductList.module.sass";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductList({ keyword }) {
  let params = useParams();
  let category = params.category || "all";

  const [products, setProducts] = useState([]);
  async function getProduct(category) {
    let result;
    if (keyword) {
      result = await axios.get(`http://3.212.173.194/api/1.0/products/search?keyword=${keyword}`);
    } else {
      result = await axios.get(`http://3.212.173.194/api/1.0/products/${category}`);
    }
    setProducts(result.data.data);
  }

  useEffect(() => {
    getProduct(category);
  }, [category, keyword]);

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
