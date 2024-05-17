import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProfile, setEditProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    photo: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "https://react-node-module.onrender.com/user/profile",
          config
        );
        setProfile(response.data.user);
        setEditProfile({
          ...response.data.user,
          photo: null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("firstName", editProfile.firstName);
      formData.append("lastName", editProfile.lastName);
      formData.append("phone", editProfile.phone);
      if (editProfile.photo) {
        formData.append("photo", editProfile.photo);
      }

      await axios.put(
        "https://react-node-module.onrender.com/user/edit-profile",
        formData,
        config
      );

      setProfile({
        ...editProfile,
        photo: editProfile.photo
          ? URL.createObjectURL(editProfile.photo)
          : profile.photo,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <div className="profile-content mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="card d-flex">
                <div className="card-body">
                  <h5 className="card-title">Profile Details</h5>
                  <p className="card-text">
                    <strong>First Name:</strong> {profile.firstName}
                  </p>
                  <p className="card-text">
                    <strong>Last Name:</strong> {profile.lastName}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone Number:</strong> {profile.phone}
                  </p>
                  <p className="card-text">
                    <strong>Role:</strong> {profile.role}
                  </p>
                  {profile.photo && (
                    <img
                      style={{ width: "300px" }}
                      src={profile.photo}
                      alt="Profile"
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="card-body w-50 text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={editProfile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={editProfile.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={editProfile.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">
                    Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
