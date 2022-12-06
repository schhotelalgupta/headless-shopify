import React from "react";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavbar from "./pages/TopNavbar";
import Cart from "./pages/Cart";
function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Router>
        <Routes>
          <Route exact path="/collection" element={<Collection />} />
          <Route path="/products/:handle" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
