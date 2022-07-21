import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import ProductList from "../ProductList/ProductList";
import Footer from "../Footer/Footer";
import { useState } from "react";

function Index() {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <Navbar setKeyword={setKeyword} />
      <Banner />
      <ProductList keyword={keyword} />
      <Footer />
    </>
  );
}

export default Index;
