import React, { useState, useEffect } from "react";
import "../css/ForgotPassword.css";
import { toast } from "react-toastify";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {

  // ---------- IMAGE SLIDER ----------
  const images = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
  ];

  const [currentImg, setCurrentImg] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---------- SUBMIT ----------
  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/auth/user/all",
        { email }
      );

      // ✅ Success
      toast.success(
        res.data?.message || "Reset link sent successfully"
      );
      setEmail("");

    } catch (err) {
      // ❌ Error
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------- JSX ----------
  return (
    <MDBContainer fluid className="forgot-page">
      <MDBCard className="forgot-card">
        <MDBCardBody className="px-5">

          {/* IMAGE SLIDER */}
          <div className="image-slider">
            <img src={images[currentImg]} alt="SugarPetal" />
          </div>

          <h3 className="text-center forgot-title">
            Forgot Password?
          </h3>

          <p className="text-center forgot-text mb-4">
            Enter your registered email to reset your password
          </p>

          <div className="forgot-form">

            <div className="mb-3">
              <MDBInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <MDBBtn
              className="forgot-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </MDBBtn>

          </div>

          <div className="text-center mt-3">
            <Link to="/" className="back-login">
              Back to Login
            </Link>
          </div>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPassword;
