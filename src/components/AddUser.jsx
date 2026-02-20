import React, { useState } from "react";
import Modal from "react-modal";
import "../css/EditProfile.css";
import axios from "axios";

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
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ADD USER API CALL
  const handleAdd = async () => {
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    const payload = {
      name,
      username,
      email,
      address,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "https://backend-sv9r.onrender.com/auth/user/all",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        onAdd(response.data.user); // send user to parent
        close();

        // reset form
        setName("");
        setUsername("");
        setEmail("");
        setAddress("");
      }
    } catch (error) {
      console.error("Add user error:", error);
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
          <button className="close-btn" onClick={close}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>

        <div className="modal-footer">
          <button
            className="btn primary"
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>

          <button className="btn secondary" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUser;
