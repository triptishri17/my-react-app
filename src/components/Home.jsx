import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import AddUser from "./AddUser";
import DeleteConfirm from "./DeleteConfrim";


import { toast } from "sonner";
import "../css/Home.css";


function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => toast.error("Failed to fetch users"));
  }, []);

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
      })
      .catch(() => toast.error("Failed to add user"));
  };

  const handleUpdateUser = (updatedUser) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then(res => res.json())
      .then(data => {
        setUsers(users.map(u => (u.id === data.id ? data : u)));
        toast.success("User updated successfully ✅");
      })
      .catch(() => toast.error("Failed to update user"));
  };

  const confirmDeleteModal = (id) => {
    setDeleteUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${deleteUserId}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter(u => u.id !== deleteUserId));
        setDeleteModalOpen(false);
        setDeleteUserId(null);
        toast.success("User deleted successfully 🗑️");
      })
      .catch(() => toast.error("Failed to delete user"));
  };

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <button onClick={() => setAddModalOpen(true)}>Add User</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
<tbody>
  {[...users].reverse().map((user, index) => (
    <tr key={user.id}>
    
      <td>{index + 1}</td>

      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address?.street}</td>

      <td>
        <button onClick={() => {
          setSelectedUser(user);
          setEditModalOpen(true);
        }}>
          Edit
        </button>

        <button onClick={() => confirmDeleteModal(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


      </table>

      <AddUser isOpen={addModalOpen} close={() => setAddModalOpen(false)} onAdd={handleAddUser} />
      <EditProfile isOpen={editModalOpen} close={() => setEditModalOpen(false)} user={selectedUser} onSave={handleUpdateUser} />
      <DeleteConfirm isOpen={deleteModalOpen} close={() => setDeleteModalOpen(false)} onConfirm={handleDeleteUser} />

      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}

export default Home;
