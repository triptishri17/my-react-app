
import React, { useEffect, useState } from "react";
import "../css/Settings.css";

import { updateProfile,
  updatePassword, savePreferences,
  deleteAccount
} from "../services/settingsService";

function Settings() {

  const [profile, setProfile] = useState({
    fullName: "",
    email: ""
  });

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    darkMode: false,
  });

  const [loading, setLoading] = useState(false);

  /* ================= LOAD USER PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();

        const user = res.data.user;

        setProfile({
          fullName: user.fullName || "",
          email: user.email || ""
        });

        if (user.preferences) {
          setPreferences(user.preferences);
        }

      } catch (err) {
        console.log("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  /* ================= UPDATE PROFILE ================= */

  const handleProfileSave = async () => {
    try {
      setLoading(true);

      await updateProfile(profile);

      alert("Profile updated successfully");

    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE PASSWORD ================= */

  const handlePasswordUpdate = async () => {

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await updatePassword({
        newPassword: passwords.newPassword
      });

      setPasswords({
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated successfully");

    } catch (err) {
      alert("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE PREFERENCES ================= */

  const handlePreferenceChange = async (key, value) => {

    const updated = {
      ...preferences,
      [key]: value
    };

    setPreferences(updated);

    try {
      await savePreferences(updated);
    } catch (err) {
      console.log("Preference save failed");
    }
  };

  /* ================= DELETE ACCOUNT ================= */

  const handleDeleteAccount = async () => {

    if (!window.confirm("This action cannot be undone")) return;

    try {
      await deleteAccount();

      localStorage.clear();

      window.location.href = "/login";

    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security</p>
      </div>

      {/* PROFILE */}

      <div className="settings-card">
        <h3>Profile Information</h3>

        <div className="form-grid">

          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  fullName: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value
                })
              }
            />
          </div>

        </div>

        <button
          className="primary-btn"
          disabled={loading}
          onClick={handleProfileSave}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* PASSWORD */}

      <div className="settings-card">

        <h3>Security</h3>

        <div className="form-grid">

          <div>
            <label>New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value
                })
              }
            />
          </div>

        </div>

        <button
          className="primary-btn"
          disabled={loading}
          onClick={handlePasswordUpdate}
        >
          Update Password
        </button>

      </div>

      {/* PREFERENCES */}

      <div className="settings-card">

        <h3>Preferences</h3>

        <div className="toggle-row">
          <span>Email Notifications</span>

          <input
            type="checkbox"
            checked={preferences.emailNotifications}
            onChange={(e) =>
              handlePreferenceChange(
                "emailNotifications",
                e.target.checked
              )
            }
          />
        </div>

        <div className="toggle-row">
          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={(e) =>
              handlePreferenceChange(
                "darkMode",
                e.target.checked
              )
            }
          />
        </div>

      </div>

      {/* DELETE ACCOUNT */}

      <div className="settings-card danger-zone">

        <h3>Danger Zone</h3>

        <p>This action cannot be undone.</p>

        <button
          className="danger-btn"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>

      </div>

    </div>
  );
}

export default Settings;

