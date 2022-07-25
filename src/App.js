import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/ProfilePage/ProfilePage.js";
import LoginPage from "./Pages/LoginPage/LoginPage.js";
import ProductPage from "./Pages/ProductPage/ProductPage.js";
import ThankYou from "./ThankYou/ThankYou.js";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./NotFound/NotFound";
import axios from "axios";
import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [hasLogin, setHasLogin] = useState(false);

  async function onSearchProduct() {
    try {
      setProducts([]);
      const result = await axios.get(`http://3.212.173.194/api/1.0/products/search?keyword=${keyword}`);
      setProducts(result.data.data);
    } catch (err) {
      setProducts([]);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} onSearchProduct={onSearchProduct} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index products={products} setProducts={setProducts} keyword={keyword} />}></Route>
          <Route path="/product" element={<ProductPage hasLogin={hasLogin} />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<LoginPage setHasLogin={setHasLogin} />}></Route>
          <Route path="/profile" element={<Profile setHasLogin={setHasLogin} />}></Route>
          <Route path="/search" element={<Index products={products} setProducts={setProducts} />}></Route>
          <Route path="/thankyou" element={<ThankYou />}></Route>
          <Route path="/:category" element={<Index products={products} setProducts={setProducts} />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
