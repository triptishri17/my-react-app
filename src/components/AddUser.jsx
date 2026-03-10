import React, { useState } from "react";
import Modal from "react-modal";
import "../css/EditProfile.css";
import axios from "axios";

const API_URL = "http://localhost:5000";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    borderRadius: "10px",
    width: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const AddUser = ({ isOpen, close, onAdd }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!firstname || !email || !password) {
      alert("Firstname, Email and Password are required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const requestObject = {
       firstName: firstname ,
       lastName: lastname,
       email: email,
       password: password,
      };

      const response = await axios.post(
        `${API_URL}/auth/user/user-register`,
        requestObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        onAdd(response.data.user);
        close();

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      alert("Failed to add user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="edit-modal">
        <div className="modal-header">
          <h2>Add User</h2>
          <button className="close-btn" onClick={close}>×</button>
        </div>

        <div className="modal-body">
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
          />

          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <button className="btn secondary" onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUser;
