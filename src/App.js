import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/:category" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
