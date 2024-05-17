import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MyCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `https://react-node-module.onrender.com/user/cart/details`,
          config
        );

        setCart(response.data.cart);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Cart Details</h1>
      {cart && (
        <div>
          <h2>User Information</h2>
          <p>
            Name: {cart.user.firstName} {cart.user.lastName}
          </p>
          <p>Email: {cart.user.email}</p>
          <p>Phone: {cart.user.phone}</p>

          <h2>Items</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={
                        item.product.photo || "https://via.placeholder.com/100"
                      }
                      alt={item.product.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div>
                      <p>{item.product.vendor.name}</p>
                      <p>{item.product.vendor.address}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total Price: {cart.totalPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default MyCart;
