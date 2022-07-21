import styles from "./Banner.module.sass";

function Banner() {
  let slogan = "<h1>於是</h1><h1>我也想要給你</h1><h1>一個那麼美好的自己。</h1><h2>不朽《與自己和好如初》</h2>";
  return (
    <>
      <div className={styles.banner}>
        <img alt="banner" src="http://3.212.173.194/uploads/1658370308488.png"></img>
        <div dangerouslySetInnerHTML={{ __html: slogan }}></div>
      </div>
    </>
  );
}

export default Banner;
