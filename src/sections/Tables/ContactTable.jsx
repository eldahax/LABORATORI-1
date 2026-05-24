import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this contact?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState(""); // FIX
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [confirm, setConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/contacts",
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      setContacts(data.data || data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDelete = (id) => {
    setSelectedId(id);
    setConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/contacts/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }

      );

      if (!res.ok) {
        setAlert({
          show: true,
          message: "Delete failed",
          type: "error",
        });
        return;
      }

      setContacts((prev) =>
        prev.filter((c) => c.contact_id !== selectedId)
      );

      setAlert({
        show: true,
        message: "Contact deleted successfully",
        type: "success",
      });

      setConfirm(false);
      setSelectedId(null);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };


  const filteredContacts = contacts.filter((c) => {
    const q = search.toLowerCase();

    return (
      (c.fullname || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.phone_number || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <Navbar />

      <div className="min-h-screen flex">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold text-[#0F766E]">
              Contacts
            </h1>

            <button
              onClick={() => navigate("/add-contact")}
              className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
            >
              + Add Contact
            </button>
          </div>

          <div className="w-1/2 mb-6">
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.contact_id} className="border-b">
                  <td>{c.contact_id}</td>
                  <td>{c.fullname}</td>
                  <td>{c.email}</td>
                  <td>{c.phone_number}</td>
                  <td className="truncate max-w-xs">
                    {c.message}
                  </td>

                  <td className="flex gap-2">

                    <button
                      onClick={() => openDelete(c.contact_id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <ConfirmModal
        show={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={handleDelete}
      />

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert({ show: false, message: "", type: "success" })
        }
      />
    </div>
  );
}