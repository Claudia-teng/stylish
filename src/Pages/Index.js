import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Index() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  let params = useParams();
  let category = params.category || "all";

  async function handleKeyPress(e) {
    if (e.key === "Enter") onSearchProduct();
  }

  async function onSearchProduct() {
    try {
      const result = await axios.get(`http://3.212.173.194/api/1.0/products/search?keyword=${keyword}`);
      setProducts(result.data.data);
    } catch (err) {
      setProducts([]);
    }
  }

  async function getProduct(category) {
    const result = await axios.get(`http://3.212.173.194/api/1.0/products/${category}`);
    setProducts(result.data.data);
  }

  useEffect(() => {
    getProduct(category);
  }, [category]);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        onSearchProduct={onSearchProduct}
      />
      <Banner />
      <ProductList keyword={keyword} products={products} />
      <Footer />
    </>
  );
}

export default Index;
