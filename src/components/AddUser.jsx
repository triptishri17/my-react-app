import React, { useState } from "react";
import Modal from "react-modal";
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

const AddUser = ({ isOpen, close, onAdd }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    const newUser = {
      name,
      username,
      email,
      address: { street: address },
    };

    onAdd(newUser);
    close();

    // reset
    setName("");
    setUsername("");
    setEmail("");
    setAddress("");
  };
  const handleAddUser = (newUser) => {
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then(res => res.json())
    .then(data => {
      setUsers([...users, { ...newUser, id: data.id || users.length + 1 }]);
      toast.success("User added successfully ✅");
    });
};


  return (
    <Modal isOpen={isOpen} onRequestClose={close} style={customStyles} ariaHideApp={false}>
      <div className="edit-modal">
        <div className="modal-header">
          <h2>Add User</h2>
          <button className="close-btn" onClick={close}>×</button>
        </div>

        <div className="modal-body">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={handleAdd}>Add</button>
          <button className="btn secondary" onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUser;
