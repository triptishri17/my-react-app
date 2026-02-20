import { useEffect, useState, useMemo } from "react";
import EditProfile from "./EditProfile";
import AddUser from "./AddUser";
import DeleteConfirm from "./DeleteConfrim";
import { toast } from "sonner";
import "../css/userList.css";

import {
    Pencil,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { getAllUsersList, adminDeleteUser } from "../services/users.service";

const USERS_PER_PAGE = 5;

function UserList() {
    /* ---------- STATES ---------- */
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedUser, setSelectedUser] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    /* ---------- FETCH USERS ---------- */
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsersList();

            if (response?.success && Array.isArray(response.users)) {
                setUsers(response.users);
            } else {
                toast.error("Failed to load users ❌");
            }
        };

        fetchUsers();
    }, []);

    /* ---------- SEARCH (FIXED) ---------- */
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const fullName = `${user.firstName || ""} ${user.lastName || ""} ${user.username || ""}`
                .toLowerCase();

            return (
                fullName.includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [users, searchTerm]);

    /* ---------- PAGINATION ---------- */
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;

    const currentUsers = filteredUsers
        .slice()
        .reverse()
        .slice(startIndex, startIndex + USERS_PER_PAGE);

    /* ---------- HANDLERS ---------- */
    const confirmDeleteModal = (id) => {
        setDeleteUserId(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Unauthorized ❌");
                return;
            }

            const response = await adminDeleteUser(deleteUserId, token);

            if (response?.success) {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== deleteUserId)
                );

                if (currentUsers.length === 1 && currentPage > 1) {
                    setCurrentPage((p) => p - 1);
                }

                toast.success("User deleted successfully 🗑️");
            } else {
                toast.error(response?.message || "Delete failed ❌");
            }
        } catch (error) {
            toast.error("Server error ❌");
        } finally {
            setDeleteModalOpen(false);
            setDeleteUserId(null);
        }
    };

    /* ---------- JSX ---------- */
    return (
        <div className="user-list-wrapper">
            {/* HEADER */}
            <div className="user-list-header">
                <div>
                    <h2>User Management</h2>
                    <p>Manage all registered users</p>
                </div>

                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <button
                        className="add-user-btn"
                        onClick={() => setAddModalOpen(true)}
                    >
                        <Plus size={18} /> Add User
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers.map((user, index) => {
                        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

                        return (
                            <tr key={user._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>
                                    {fullName ? fullName : user.username}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setEditModalOpen(true);
                                        }}
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>

                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => confirmDeleteModal(user._id)}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    {currentUsers.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* MODALS */}
            <AddUser
                isOpen={addModalOpen}
                close={() => setAddModalOpen(false)}
                onAdd={(u) => setUsers((prev) => [u, ...prev])}
            />

            <EditProfile
                isOpen={editModalOpen}
                close={() => setEditModalOpen(false)}
                user={selectedUser}
                onSave={(updatedUser) =>
                    setUsers((prev) =>
                        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
                    )
                }
            />

            <DeleteConfirm
                isOpen={deleteModalOpen}
                close={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteUser}
            />
        </div>
    );
}

export default UserList;
