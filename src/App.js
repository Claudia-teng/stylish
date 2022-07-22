import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import Cart from "./Pages/Cart.js";
import Profile from "./Pages/Profile.js";
import ProductPage from "./Pages/ProductPage/ProductPage.js";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function App() {
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
    console.log("aaa");
    getProduct(category);
  }, [category]);

  return (
    <>
      <BrowserRouter>
        <Navbar
          keyword={keyword}
          setKeyword={setKeyword}
          handleKeyPress={handleKeyPress}
          onSearchProduct={onSearchProduct}
        />
        <Routes>
          <Route path="/" element={<Index keyword={keyword} products={products} />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/:category" element={<Index keyword={keyword} products={products} />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
