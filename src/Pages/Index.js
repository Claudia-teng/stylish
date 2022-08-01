import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Index({ products, setProducts, keyword }) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let params = useParams();
  let category = params.category || "all";

  async function getProduct(category) {
    const categories = ["all", "women", "men", "accessories"];
    if (!categories.includes(category)) {
      navigate("/not-found", { replace: true });
    }
    setLoading(true);
    setProducts([]);
    const result = await axios.get(`https://claudia-teng.com/api/1.0/products/${category}`);
    setProducts(result.data.data);
    setLoading(false);
  }

  useEffect(() => {
    if (keyword) return;
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
