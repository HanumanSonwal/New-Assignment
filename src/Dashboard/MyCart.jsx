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
          "https://react-node-module.onrender.com/user/cart/details",
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

  if (loading)
    return <div className="text-center card-title mt-5">Loading...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-3">Cart Details</h2>
          {cart && (
            <div>
              <h2 className="h4">User Information</h2>
              <p>
                <strong>Name:</strong> {cart.user.firstName}{" "}
                {cart.user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {cart.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {cart.user.phone}
              </p>

              <h2 className="h4 mt-4 card-title mb-3">Items</h2>
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
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
                            item.product.photo ||
                            "https://via.placeholder.com/100"
                          }
                          alt={item.product.name}
                          className="img-fluid"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                          }}
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>${item.product.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <p className="m-0">{item.product.vendor.name}</p>
                        <p className="m-0">{item.product.vendor.address}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h5 className="mt-4 card-title mb-3">
                Total Price: ${cart.totalPrice.toFixed(2)}{" "}
                <button className="btn w-25 ms-4">Procced to pay</button>
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCart;
