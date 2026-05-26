import { useEffect, useState } from "react";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import EditUserModal from "../../Crudforms/EditUser"; 

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-black">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-gray-600">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Table() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user.user_id !== selectedId));
        setAlert({
          show: true,
          message: "User successfully unlinked and deleted.",
          type: "success",
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setAlert({
          show: true,
          message: errData.error || "Failed to complete delete routing",
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const handleEditUserSuccess = () => {
    setAlert({
      show: true,
      message: "User context variables saved cleanly!",
      type: "success",
    });
    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    const firstName = user.first_name?.toLowerCase() || "";
    const lastName = user.last_name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const lowerSearch = searchTerm.toLowerCase();

    return (
      firstName.includes(lowerSearch) ||
      lastName.includes(lowerSearch) ||
      email.includes(lowerSearch)
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl mb-8 overflow-x-auto">
      <Navbar />

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ show: false, message: "", type: "success" })}
      />

      <ConfirmModal
        show={confirmOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
      />
      <EditUserModal
        show={editUserOpen}
        userId={editUserId}
        onClose={() => {
          setEditUserOpen(false);
          setEditUserId(null);
        }}
        onSuccess={handleEditUserSuccess}
      />

      <div className="min-h-screen">
        <div className="flex w-full min-h-screen mt-[50px]">
          <Sidebar />

          <div className="w-3/4 p-10 ml-[25%]">
            <TableCard />

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
              <h1 className="text-lg sm:text-xl font-bold text-[#0F766E] mb-6">
                USERS
              </h1>

              <div className="w-1/2 max-w-sm mb-6">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                />
              </div>

              <table className="min-w-full text-left text-sm sm:text-base text-black">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pl-4">ID</th>
                    <th className="py-2">First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.user_id} className="border-b hover:bg-gray-50">
                      <td className="py-4 pl-4">{user.user_id}</td>
                      <td className="py-2">{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number || "—"}</td>

                      <td className="flex gap-2 py-3">
                        <button
                          onClick={() => {
                            setSelectedId(user.user_id);
                            setConfirmOpen(true);
                          }}
                          className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg transition cursor-pointer"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => {
                            setEditUserId(user.user_id);
                            setEditUserOpen(true);
                          }}
                          className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg transition cursor-pointer"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No matching users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}