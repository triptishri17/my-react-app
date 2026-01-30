import React from "react";
import "../css/ForgotPassword.css"

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <MDBContainer fluid className="forgot-page">
      <MDBCard className="forgot-card">
        <MDBCardBody className="p-4">

          <h4 className="text-center mb-3 forgot-title">
            Forgot Password
          </h4>

          <p className="text-center forgot-text">
            Enter your registered email
          </p>

          <MDBInput
            className="mb-4"
            label="Email address"
            type="email"
            size="lg"
          />

          <MDBBtn color="dark" className="forgot-btn w-100 mb-3">
            Send Reset Link
          </MDBBtn>

          <div className="text-center">
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

