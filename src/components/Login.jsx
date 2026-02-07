import React, { useState, useEffect } from "react";
import "../css/Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");
    setSuccessMsg("");

    let valid = true;

    if (!email) {
      setEmailError("Email required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password required");
      valid = false;
    }

    if (!valid) return;

    if (email === "admin@gmail.com" && password === "1234") {
      setSuccessMsg("✅ Login Successful");
      setTimeout(() => navigate("/home"), 1000);
    } else {
      setPasswordError("Invalid email or password");
    }
  };

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

              {/* TITLE */}
              <h2 className="text-center welcome-title">
                Welcome to <span>SugarPetal</span>
              </h2>
              <p className="text-center text-muted mb-4">
                Please login to continue
              </p>

              {/* FORM (WIDTH CONTROLLED) */}
              <div className="login-form">

                <div className="mb-3">
                  <MDBInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <small className="text-danger">{emailError}</small>
                  )}
                </div>

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

                  {passwordError && (
                    <small className="text-danger">{passwordError}</small>
                  )}
                </div>

                <MDBBtn
                  color="dark"
                  className="login-btn mb-3"
                  onClick={handleLogin}
                >
                  Login
                </MDBBtn>

              </div>

              {successMsg && (
                <p className="text-success text-center fw-bold">
                  {successMsg}
                </p>
              )}

              <Link
                to="/forgot-password"
                className="small text-muted d-block text-center"
              >
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
