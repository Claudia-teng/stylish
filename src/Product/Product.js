import styles from "./Product.module.sass";

function Product({ product }) {
  return (
    <>
      <div className={styles.card}>
        <img alt="product" src={product.main_image} />
        <div className={styles.colorBoxes}>
          {product.colors.map((color, i) => {
            return <div key={i} style={{ backgroundColor: `#${color.code}` }}></div>;
          })}
        </div>
        <p>{product.title}</p>
        <p>TWD.{product.price}</p>
      </div>
    </>
  );
}

export default Product;
