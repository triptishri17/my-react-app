import React, { useState } from "react";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleRegister = () => {
    let newErrors = {};

    if (!name) newErrors.name = "Name required";
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSuccess("✅ Registration Successful");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <MDBContainer fluid className="register-page">
      <MDBCard className="register-card">
        <MDBCardBody className="p-4">

          <h3 className="text-center mb-4">Create Account</h3>

          <div className="mb-3">
            <MDBInput
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="mb-3">
            <MDBInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <MDBInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <MDBBtn color="dark" className="w-100 mb-3" onClick={handleRegister}>
            Register
          </MDBBtn>

          {success && (
            <p className="text-success text-center fw-bold">
              {success}
            </p>
          )}

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/" className="fw-bold">
              Login
            </Link>
          </p>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
