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

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    let newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name required";
    if (!form.lastName) newErrors.lastName = "Last name required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.password) newErrors.password = "Password required";
    if (!form.country) newErrors.country = "Country required";

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
        <MDBCardBody className="p-4">

          <h3 className="text-center mb-1">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Join us and start your journey 🚀
          </p>

          <div className="row mb-3">
            <div className="col">
              <MDBInput
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>

            <div className="col">
              <MDBInput
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
            </div>
          </div>

          <div className="mb-3">
            <MDBInput
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <MDBInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-4">
            <select
              className="form-select"
              name="country"
              value={form.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <small className="text-danger">{errors.country}</small>}
          </div>

          <MDBBtn className="w-100 register-btn" onClick={handleRegister}>
            Register
          </MDBBtn>

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

