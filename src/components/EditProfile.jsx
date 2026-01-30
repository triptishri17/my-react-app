import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import "../css/EditProfile.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    borderRadius: "10px",
    width: "400px",
  },
  overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
};

const EditProfile = ({ isOpen, close, user, onSave }) => {
  const isEdit = Boolean(user);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setAddress(user.address?.street || "");
    } else {
      setName("");
      setUsername("");
      setEmail("");
      setAddress("");
    }
  }, [user, isOpen]);

  const validate = () => {
    if (!name.trim()) return toast.warning("Name is required");
    if (!username.trim()) return toast.warning("Username is required");
    if (!email.trim()) return toast.warning("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.warning("Invalid email format");
    if (!address.trim()) return toast.warning("Address is required");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = { ...user, name, username, email, address: { street: address } };
    onSave(payload);
    close();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={close} style={customStyles} ariaHideApp={false}>
      <div className="edit-modal">
        <div className="modal-header">
          <h2>{isEdit ? "Edit User" : "Add User"}</h2>
          <button className="close-btn" onClick={close}>×</button>
        </div>

        <div className="modal-body">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={handleSubmit}>{isEdit ? "Update" : "Add"}</button>
          <button className="btn secondary" onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
