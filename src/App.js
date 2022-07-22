import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import Cart from "./Pages/Cart.js";
import Profile from "./Pages/Profile.js";
import ProductPage from "./Pages/ProductPage/ProductPage.js";
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/:category" element={<Index />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
