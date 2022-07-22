import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";

function Index({ keyword, products }) {
  console.log("products", products);
  return (
    <>
      <Banner />
      <ProductList keyword={keyword} products={products} />
    </>
  );
}

export default Index;
