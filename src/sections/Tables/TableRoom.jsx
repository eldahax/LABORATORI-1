import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import AddRoom from "../../Crudforms/AddRoom";
import EditRoom from "../../Crudforms/EditRoom";
import CreateDepartment from "../../Crudforms/AddDepartment";
import EditDepartment from "../../Crudforms/EditDepartment";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[110]">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function TableRoom() {
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roomSearch, setRoomSearch] = useState("");
  const [depSearch, setDepSearch] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);

  const [showAddDep, setShowAddDep] = useState(false);
  const [showEditDep, setShowEditDep] = useState(false);
  const [editDepId, setEditDepId] = useState(null);

  const fetchRooms = () => {
    fetch("http://localhost:5000/api/rooms", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch(() => setAlert({ show: true, message: "Failed to load rooms", type: "error" }));
  };

  const fetchDepartments = () => {
    fetch("http://localhost:5000/api/departments", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch(() => setAlert({ show: true, message: "Failed to load departments", type: "error" }));
  };

  useEffect(() => {
    fetchRooms();
    fetchDepartments();
  }, []);

  const handleDelete = async (room_id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${room_id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setRooms((prev) => prev.filter((r) => r.room_id !== room_id));
        setAlert({ show: true, message: "Room deleted successfully", type: "success" });
      }
    } catch {
      setAlert({ show: true, message: "Server error", type: "error" });
    }
  };

  const handleDeleteD = async (department_id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/departments/${department_id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setDepartments((prev) => prev.filter((dep) => dep.department_id !== department_id));
        setAlert({ show: true, message: "Department deleted successfully", type: "success" });
      }
    } catch {
      setAlert({ show: true, message: "Server error", type: "error" });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <Navbar />
      <CustomAlert
        show={alert.show} message={alert.message} type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <ConfirmModal
        show={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (deleteType === "room") handleDelete(selectedId);
          else handleDeleteD(selectedId);
          setConfirmOpen(false);
        }}
      />

      {showAddRoom && <AddRoom onClose={() => setShowAddRoom(false)} refresh={fetchRooms} />}
      {showEditRoom && <EditRoom id={editRoomId} onClose={() => setShowEditRoom(false)} refresh={fetchRooms} />}
      {showAddDep && <CreateDepartment onClose={() => setShowAddDep(false)} refresh={fetchDepartments} />}
      {showEditDep && <EditDepartment id={editDepId} onClose={() => setShowEditDep(false)} refresh={fetchDepartments} />}

      <div className="min-h-screen">
        <div className="flex w-full min-h-screen mt-[50px]">
          <Sidebar />
          <div className="w-3/4 p-10 ml-[25%]">
            <TableCard />

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-bold text-[#0F766E]">Rooms</h1>
              <button onClick={() => setShowAddRoom(true)} className="bg-[#0F766E] text-white px-4 py-2 rounded-lg">+ Add Room</button>
            </div>
            <input value={roomSearch} onChange={(e) => setRoomSearch(e.target.value)} className="w-full p-3 border rounded-lg mb-6" placeholder="Search rooms..." />
            <table className="min-w-full text-left text-sm text-black">
              <thead><tr className="border-b"><th className="py-3 pl-4">ID</th><th>Room Name</th><th>Department</th><th>Chairs</th><th>Actions</th></tr></thead>
              <tbody>
                {rooms.filter(r => (r.room_name || "").toLowerCase().includes(roomSearch.toLowerCase())).map((r) => (
                  <tr key={r.room_id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pl-4">{r.room_id}</td>
                    <td>{r.room_name}</td>
                    <td>{r.Department?.department_name}</td>
                    <td>{r.chair_number}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedId(r.room_id); setDeleteType("room"); setConfirmOpen(true); }} className="text-red-500 px-3 py-1">Delete</button>
                        <button onClick={() => { setEditRoomId(r.room_id); setShowEditRoom(true); }} className="text-green-600 px-3 py-1">Update</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-[80px] flex justify-between items-center mb-6">
              <h1 className="text-lg font-bold text-[#0F766E]">Departments</h1>
              <button onClick={() => setShowAddDep(true)} className="bg-[#0F766E] text-white px-4 py-2 rounded-lg">+ Add Department</button>
            </div>
            <input value={depSearch} onChange={(e) => setDepSearch(e.target.value)} className="w-full p-3 border rounded-lg mb-6" placeholder="Search departments..." />
            <table className="min-w-full text-left text-sm text-black">
              <thead><tr className="border-b"><th className="py-3 pl-4">ID</th><th>Department Name</th><th>Actions</th></tr></thead>
              <tbody>
                {departments.filter(dep => (dep.department_name || "").toLowerCase().includes(depSearch.toLowerCase())).map((dep) => (
                  <tr key={dep.department_id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pl-4">{dep.department_id}</td>
                    <td>{dep.department_name}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedId(dep.department_id); setDeleteType("department"); setConfirmOpen(true); }} className="text-red-500 px-3 py-1">Delete</button>
                        <button onClick={() => { setEditDepId(dep.department_id); setShowEditDep(true); }} className="text-green-600 px-3 py-1">Update</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}