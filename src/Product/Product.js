import styles from "./Product.module.sass";

function Product() {
  return (
    <>
      <div className={styles.card}>
        <img alt="product" src="http://3.212.173.194/uploads/1658370326714.png" />
        <div className={styles.colorBoxes}>
          <div></div>
          <div></div>
        </div>
        <p>前開衩扭結洋裝</p>
        <p>TWD.799</p>
      </div>
    </>
  );
}

export default Product;
