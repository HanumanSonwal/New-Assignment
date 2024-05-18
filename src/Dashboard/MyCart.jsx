import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MyCart() {
  const [cart, setCart] = useState(null);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(error);

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

        const { status, cart, message } = response.data;

        if (status) {
          setCart(cart);

          const initialCounts = cart.items.reduce((acc, item) => {
            acc[item.product._id] = item.quantity;
            return acc;
          }, {});
          setCounts(initialCounts);
        } else {
          throw new Error(message); // Throw an error to trigger the catch block
        }
      } catch (err) {
        setError(err.message || "Failed to fetch cart details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

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

      updateCartTotalPrice(productId, 1);
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

      updateCartTotalPrice(productId, -1);
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  const updateCartTotalPrice = (productId, quantityChange) => {
    const product = cart.items.find((item) => item.product._id === productId);
    const productPrice = product.product.price;
    const updatedTotalPrice = cart.totalPrice + productPrice * quantityChange;

    setCart((prevCart) => ({
      ...prevCart,
      totalPrice: updatedTotalPrice,
      items: prevCart.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + quantityChange }
          : item
      ),
    }));
  };

  if (loading)
    return <div className="text-center card-title mt-5">Loading...</div>;
  if (error)
    return <div className="text-center mt-5 card-title">Cart not found</div>;

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
                    <th>Total</th>
                    <th>Vendor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.product._id}>
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
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <p className="m-0">{item.product.vendor.name}</p>
                        <p className="m-0">{item.product.vendor.address}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => decrement(item.product._id)}
                            disabled={counts[item.product._id] === 0}
                          >
                            -
                          </button>
                          <span className="mx-2">
                            {counts[item.product._id]}
                          </span>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => increment(item.product._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h5 className="mt-4 card-title mb-3">
                Total Price: ${cart.totalPrice.toFixed(2)}{" "}
                <button className="btn btn-primary w-25 ms-4">
                  Proceed to Pay
                </button>
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCart;
