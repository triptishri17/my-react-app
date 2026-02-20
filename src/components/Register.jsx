import React, { useState, useEffect } from "react";
import "../css/Register.css";
import { toast } from "react-toastify";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdb-react-ui-kit";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // ---------- IMAGE SLIDER ----------
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

  // ---------- FORM STATE ----------
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null
  });

  const [errors, setErrors] = useState({});

  // ---------- HANDLERS ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // ✅ Frontend validation
    if (!form.username) newErrors.username = "Username required";
    if (!form.email || !emailRegex.test(form.email))
      newErrors.email = "Valid email required";
    if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8+ chars with uppercase, number & special char";
    if (!form.avatar) newErrors.avatar = "Avatar is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the form errors");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("avatar", form.avatar);

      const res = await axios.post(
        "https://backend-sv9r.onrender.com/auth/user/user-register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.success) {
        toast.success("🎉 Registration Successful!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(res.data?.message || "Registration failed");
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Server error, try again"
      );
    }
  };

  // ---------- JSX ----------
  return (
    <MDBContainer fluid className="register-page">
      <MDBCard className="register-card">
        <MDBCardBody className="px-5">

          {/* IMAGE SLIDER */}
          <div className="image-slider">
            <img src={images[currentImg]} alt="SugarPetal" />
          </div>

          <h2 className="text-center register-title">
            Join <span>SugarPetal</span>
          </h2>

          <p className="text-center text-muted mb-4">
            Explore your beauty with us
          </p>

          <div className="register-form">

            {/* USERNAME */}
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

            {/* EMAIL */}
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

            {/* PASSWORD */}
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

            {/* AVATAR */}
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) =>
                  setForm({ ...form, avatar: e.target.files[0] })
                }
              />
              {errors.avatar && (
                <small className="text-danger">{errors.avatar}</small>
              )}
            </div>

            <MDBBtn className="register-btn w-100" onClick={handleRegister}>
              Create Account
            </MDBBtn>

          </div>

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
