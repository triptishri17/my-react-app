import React from "react";
import Modal from "react-modal";
import "../css/EditProfile.css"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
  },
  overlay: { backgroundColor: "rgba(21, 12, 12, 0.5)" },
};

const DeleteConfirm = ({ isOpen, close, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this user?</p>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button className="btn primary" onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className="btn secondary" onClick={close}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
