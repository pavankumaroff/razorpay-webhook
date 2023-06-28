import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "./pages/CustomNavbar";
import Products from "./pages/Products";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductForm from "./pages/ProductForm";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
