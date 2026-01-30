import React, { useState } from "react";
import "../css/Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // 🔹 states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 🔹 login function
  const handleLogin = () => {
    // reset
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
      setSuccessMsg("✅ Successful Login");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setPasswordError("Invalid email or password");
    }
  };

  return (
    <MDBContainer fluid className="login-page">
      <MDBCard className="login-card">
        <MDBRow className="g-0">

          
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login"
              className="w-100 h-100 rounded-start"
            />
          </MDBCol>

          
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column px-5">

              <h3 className="text-center mb-4">Login</h3>

              
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

            
              <MDBBtn color="dark" className="mb-3" onClick={handleLogin}>
                Login
              </MDBBtn>

              
              {successMsg && (
                <p className="text-success text-center fw-bold">
                  {successMsg}
                </p>
              )}

              
              <Link to="/forgot-password" className="small text-muted text-center">
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


