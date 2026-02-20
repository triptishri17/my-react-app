import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { toast } from "react-toastify";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {
  const navigate = useNavigate();

  // ---------- STATE ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

  // ---------- LOGIN HANDLER ----------
  const handleLogin = async () => {
    setErrors({});
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors");
      return;
    }

    try {
      const res = await AuthService.login(email, password);
console.log(res,"dfasdfasf")
      // ✅ BEST PRACTICE: check token
      if (res?.token) {
        toast.success("Login successful 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 800);
      } else {
        toast.error(res?.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error(err.message || "Server error, try again");
    }
  };

  // ---------- JSX ----------
  return (
    <MDBContainer fluid className="login-page">
      <MDBCard className="login-card">
        <MDBRow className="g-0">
          <MDBCol md="12">
            <MDBCardBody className="px-5">

              {/* IMAGE SLIDER */}
              <div className="image-slider">
                <img src={images[currentImg]} alt="SugarPetal" />
              </div>

              <h2 className="text-center welcome-title">
                Welcome to <span>SugarPetal</span>
              </h2>

              <div className="login-form">

                {/* EMAIL */}
                <div className="mb-3">
                  <MDBInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-3 position-relative">
                  <MDBInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <MDBIcon
                    fas
                    icon={showPassword ? "eye-slash" : "eye"}
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                {/* BUTTON */}
                <MDBBtn className="login-btn mb-3" onClick={handleLogin}>
                  Login
                </MDBBtn>
              </div>

              <Link to="/forgot-password" className="small d-block text-center">
                Forgot password?
              </Link>

              <p className="text-center mt-3">
                Don’t have an account?{" "}
                <Link to="/register" className="fw-bold">
                  Register
                </Link>
              </p>

            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
