import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router-dom";

function ShowItems() {
  const { id } = useParams();
  const [counts, setCounts] = useState({});
  const [products, setProducts] = useState([]);
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
        console.log(response, "response");
        const initialCounts = response.data.products.reduce((acc, product) => {
          acc[product._id] = 0;
          return acc;
        }, {});
        console.log(initialCounts, "initialCounts");
        setCounts(initialCounts);
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const increment = async (productId) => {
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
        { productId, quantity: counts[productId] + 1 },
        config
      );

      setCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] + 1,
      }));
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  const decrement = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.put(
        `https://react-node-module.onrender.com/user/cart/remove-quantity/${productId}`,
        {},
        config
      );

      setCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: Math.max(prevCounts[productId] - 1, 0),
      }));
    } catch (err) {
      console.error("Error removing item from cart:", err);
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
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => decrement(product._id)}
                    disabled={counts[product._id] === 0}
                  >
                    -
                  </button>
                  <span className="mx-2">{counts[product._id]}</span>
                  <button
                    className="btn  btn-sm"
                    onClick={() => increment(product._id)}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowItems;
