import axios from "axios";
import styles from "./ProductPage.module.sass";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductPage() {
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("S");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  async function getProductDetail() {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/details?id=${id}`);
    setProduct(result.data.data ? result.data.data : null);
    setColor(result.data.data.colors[0].code);
  }

  function handleCounter(event, type) {
    if (type === "plus") {
      setCounter((counter) => counter + 1);
    } else {
      if (counter === 0) return;
      setCounter((counter) => counter - 1);
    }
  }

  function onSelectSize(event, size) {
    setSize(size);
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
              <div className={styles.colorBoxes}>
                {product?.colors?.map((color, i) => {
                  return (
                    <div
                      key={i}
                      className={color.code === selectedColor ? styles.colorActive : ""}
                      style={{ backgroundColor: `#${color.code}` }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className={styles.size}>
              <span>尺寸</span>
              <div className={styles.sizesBoxes}>
                {product?.sizes?.map((size, i) => {
                  return (
                    <div
                      key={i}
                      className={size === selectedSize ? styles.sizeActive : ""}
                      onClick={(event) => onSelectSize(event, size)}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.count}>
              <span>數量</span>
              <div className={styles.counter}>
                <button onClick={(event) => handleCounter(event, "minus")}>-</button>
                <p>{counter}</p>
                <button onClick={(event) => handleCounter(event, "plus")}>+</button>
              </div>
            </div>
            <button className={styles.cartBtn}>加入購物車</button>
            <h3>{product.note}</h3>
            <h3 className={styles.texture}>{product.texture}</h3>
            <h3 className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }}></h3>
            <h3>清洗：{product.wash}</h3>
            <h3>產地：{product.place}</h3>
          </div>
        </div>
        <div className={styles.moreDetail}>更多產品資訊</div>
        <p>{product.story}</p>
        <img alt="other_image1" src={product?.images?.length ? product.images[0] : null} />
        <img alt="other_image2" src={product?.images?.length ? product.images[1] : null} />
      </div>
    </>
  );
}

export default ProductPage;
