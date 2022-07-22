import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Index({ keyword, products, setProducts }) {
  let params = useParams();
  let category = params.category || "all";

  async function getProduct(category) {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/${category}`);
    setProducts(result.data.data);
  }

  useEffect(() => {
    console.log("aaa");
    getProduct(category);
  }, [category]);

  return (
    <>
      <Banner />
      <ProductList keyword={keyword} products={products} />
    </>
  );
}

export default Index;
