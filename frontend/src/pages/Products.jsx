import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllProducts, deleteProduct } from "../services/productService";
import { useEffect, useState } from "react";
import CustomSpinner from "../components/CustomSpinner";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getAllProducts();
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      const newProducts = products.filter((p) => p._id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (productId) => {
    try {
      setPayment(true);
      // prettier-ignore
      const { data: { data } } = await http.post(import.meta.env.VITE_CHECKOUT_URL, { productId });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Pavan Corp",
        description: "Test Transaction",
        image:
          "https://p1.hiclipart.com/preview/649/933/129/ecommerce-logo-online-shopping-retail-sales-online-and-offline-shopping-cart-internet-online-auction-png-clipart.jpg",
        order_id: data.id,
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#222422",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
      setPayment(false);
    } catch (error) {
      setPayment(false);
      if (error.response && error.response.status === 404)
        toast.error(error.response.data.message);
    }
  };

  if (loading) return <CustomSpinner size="lg" />;

  return (
    <Row>
      {products.map((product) => (
        <Col
          key={product._id}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          className="d-flex align-items-center justify-content-center my-4"
        >
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Title className="text-muted">
                ₹ {product.price.toLocaleString("en-IN")}
              </Card.Title>
              <Card.Text>{`${product.description.slice(0, 120)}...`}</Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  onClick={() => handlePayment(product._id)}
                  variant="warning"
                  disabled={payment}
                >
                  Buy
                </Button>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/products/${product._id}`}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Products;
