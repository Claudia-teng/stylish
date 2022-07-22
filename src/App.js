import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import Cart from "./Pages/Cart.js";
import Profile from "./Pages/ProfilePage/ProfilePage.js";
import LoginPage from "./Pages/LoginPage/LoginPage.js";
import ProductPage from "./Pages/ProductPage/ProductPage.js";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <BrowserRouter>
        <Navbar
          keyword={keyword}
          setKeyword={setKeyword}
          handleKeyPress={handleKeyPress}
          onSearchProduct={onSearchProduct}
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index keyword={keyword} products={products} setProducts={setProducts} />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/:category"
            element={<Index keyword={keyword} products={products} setProducts={setProducts} />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
