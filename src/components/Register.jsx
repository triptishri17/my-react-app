import React, { useState, useEffect } from "react";
import "../css/Register.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
  ];

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // FORM STATE
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    let newErrors = {};

    if (!form.username) newErrors.username = "Username required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.password) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSuccess("🎉 Registration Successful!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <MDBContainer fluid className="register-page">
      <MDBCard className="register-card">
        <MDBCardBody className="px-5">

          {/* IMAGE SLIDER */}
          <div className="image-slider">
            <img src={images[currentImg]} alt="SugarPetal" />
          </div>

          {/* TITLE */}
          <h2 className="text-center register-title">
            Join <span>SugarPetal</span>
          </h2>
          <p className="text-center text-muted mb-4">
            Explore your beauty with us
          </p>

          {/* FORM (WIDTH CONTROLLED) */}
          <div className="register-form">

            <div className="mb-3">
              <MDBInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="mb-3">
              <MDBInput
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="mb-3">
              <MDBInput
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <MDBBtn className="register-btn" onClick={handleRegister}>
              Create Account
            </MDBBtn>

          </div>

          {success && (
            <p className="text-success text-center fw-bold mt-3">
              {success}
            </p>
          )}

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/" className="fw-bold text-decoration-none">
              Login
            </Link>
          </p>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;

