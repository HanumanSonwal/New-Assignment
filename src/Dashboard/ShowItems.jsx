import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router-dom";

function ShowItems() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `https://react-node-module.onrender.com/user/get-products/${id}`,
          config
        );

        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        `https://react-node-module.onrender.com/user/cart/add-item`,
        { productId, quantity: 1 },
        config
      );

      setAddedToCart((prevState) => ({
        ...prevState,
        [productId]: true,
      }));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to add item to cart";
      console.error("Error adding item to cart:", errorMessage);
      alert(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="card-title mb-3">Products</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.photoURL || "https://via.placeholder.com/100"}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                  }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td style={{ width: "150px" }}>
                {addedToCart[product._id] ? (
                  <span className="text-success">✔</span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowItems;
