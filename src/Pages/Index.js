import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Index({ products, setProducts }) {
  const [loading, setLoading] = useState(false);
  let params = useParams();
  let category = params.category || "all";

  async function getProduct(category) {
    setLoading(true);
    setProducts([]);
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/${category}`);
    setProducts(result.data.data);
    setLoading(false);
  }

  useEffect(() => {
    console.log("aaa");
    getProduct(category);
  }, [category]);

  return (
    <>
      <Banner />
      <ProductList loading={loading} products={products} />
    </>
  );
}

export default Index;
