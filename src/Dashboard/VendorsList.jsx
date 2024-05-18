import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function VendorsList() {
  const Navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "https://react-node-module.onrender.com/user/get-vendors",
          config
        );
        setVendors(response.data.vendors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading)
    return <div className="text-center card-title mt-5">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="card-title mb-3">Vendors</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Description</th>
            <th style={{ width: "150px" }}>action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>
                <img
                  src={vendor.photoURL}
                  alt={vendor.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                  }}
                />
              </td>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.address}</td>
              <td>{vendor.description}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    Navigate(`/portal/venders-product/${vendor._id}`)
                  }
                >
                  view item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorsList;
