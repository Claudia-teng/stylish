import axios from "axios";
import styles from "./ProductPage.module.sass";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductPage() {
  const [product, setProduct] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  async function getProductDetail() {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/details?id=${id}`);
    setProduct(result.data.data ? result.data.data : null);
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contents}>
          <img alt="main_image" src={product.main_image} />
          <div>
            <h1>{product.title}</h1>
            <h6>{product.id}</h6>
            <h2>TWD.{product.price}</h2>
            <div className={styles.color}>
              <span>顏色</span>
            </div>
            <div className={styles.size}>
              <span>尺寸</span>
            </div>
            <div className={styles.count}>
              <span>數量</span>
            </div>
            <button>加入購物車</button>
            <h3>111</h3>
            <h3>111</h3>
            <h3>111</h3>
          </div>
        </div>
        <hr />
        <p>{product.description}</p>
        {/* <img alt="other_image1" src={product.images[0]} />
        <img alt="other_image2" src={product.images[1]} /> */}
      </div>
    </>
  );
}

export default ProductPage;
