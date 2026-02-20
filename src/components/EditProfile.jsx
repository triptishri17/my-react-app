import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import "../css/EditProfile.css";
import { createUser, updateUser } from "../services/users.service";

const EditProfile = ({ isOpen, close, user, onSave, token }) => {
  const isEdit = Boolean(user?._id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setContact(user.Contact || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setAvatarPreview(user.avatar || "");
    } else {
      resetForm();
    }
  }, [user, isOpen]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    setAddress("");
    setAvatar(null);
    setAvatarPreview("");
  };

  /* ================= AVATAR ================= */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!firstName.trim()) return toast.warning("First name required");
    if (!lastName.trim()) return toast.warning("Last name required");
    if (!Contact.trim()) return toast.warning("Contact required");
    if (!address.trim()) return toast.warning("Address required");
    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("Contact", Contact);
    formData.append("address", address);

    if (!isEdit) {
      formData.append("email", email);
    }

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      if (isEdit) {
        await updateUser(user._id, formData, token);
        toast.success("User updated successfully");
      } else {
        await createUser(formData, token);
        toast.success("User created successfully");
      }

      onSave();
      close();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= MODAL STYLE ================= */
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "340px",
      padding: 0,
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={modalStyles}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="edit-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h2>{isEdit ? "Edit User" : "Add User"}</h2>
          <button className="close-btn" onClick={close}>×</button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {/* Avatar */}
          <div className="avatar-section">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="avatar"
              className="avatar-preview"
            />
            <label className="avatar-upload">
              Change
              <input type="file" hidden onChange={handleAvatarChange} />
            </label>
          </div>

          {/* Name */}
          <div className="form-row">
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Contact */}
          <input
            placeholder="Contact"
            value={Contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* Email */}
          <input
            placeholder="Email"
            value={email}
            disabled={isEdit}
            className="disabled-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Address */}
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn primary" onClick={handleSubmit}>
            {isEdit ? "Update" : "Create"}
          </button>
          <button className="btn secondary" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
