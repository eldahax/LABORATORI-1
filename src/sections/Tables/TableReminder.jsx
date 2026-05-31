import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import EditReminder from "../../Crudforms/EditReminder";

function ConfirmModal({ show, onConfirm, onCancel, loading }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[110]">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this reminder?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-60">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TableReminder() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchReminders = () => {
    fetch("http://localhost:5000/api/reminders", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setReminders(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setAlert({ show: true, message: "Failed to load reminders", type: "error" });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data));
    fetchReminders();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/reminders/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setReminders((prev) => prev.filter((r) => r.reminder_id !== deleteId));
        setAlert({ show: true, message: "Reminder deleted successfully", type: "success" });
      }
      setConfirmOpen(false);
    } catch {
      setAlert({ show: true, message: "Server error", type: "error" });
    }
    setDeleteLoading(false);
  };

  const roles = user?.roles || [];
  const getPatientName = (r) => r?.Appointment?.Patient?.User ? `${r.Appointment.Patient.User.first_name} ${r.Appointment.Patient.User.last_name}` : "Unknown";
  const getDoctorName = (r) => r?.Appointment?.Doctor?.User ? `Dr. ${r.Appointment.Doctor.User.first_name} ${r.Appointment.Doctor.User.last_name}` : "Unknown";
  const formatDate = (d) => new Date(d).toLocaleString();

  const getStatus = (r) => {
    if (r.sent) return "sent";
    const now = new Date();
    const rd = new Date(r.reminder_date);
    if (rd < now) return "overdue";
    return ((rd - now) / 3600000) <= 24 ? "due soon" : "pending";
  };

  const filtered = reminders.filter((r) => {
    const text = (getPatientName(r) + " " + getDoctorName(r) + " " + (r.message || "")).toLowerCase();
    return text.includes(search.toLowerCase()) && (statusFilter === "all" || getStatus(r) === statusFilter);
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <Navbar />
      <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />

      <ConfirmModal
        show={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleteLoading}
      />

      {showEdit && <EditReminder id={editId} onClose={() => setShowEdit(false)} refresh={fetchReminders} />}

      <div className="min-h-screen flex mt-[50px]">
        <Sidebar />
        <div className="w-3/4 ml-[25%] p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-[#0F766E]">Reminders</h1>
            <div className="flex gap-3">
              <input className="border px-3 py-2 rounded-lg text-sm" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="border px-3 py-2 rounded-lg text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div key={r.reminder_id} className="bg-gray-50 border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] uppercase px-2 py-1 rounded font-bold ${r.sent ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {getStatus(r)}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p><b>Patient:</b> {getPatientName(r)}</p>
                  <p><b>Doctor:</b> {getDoctorName(r)}</p>
                  <p className="text-gray-600 italic">"{r.message}"</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(r.reminder_date)}</p>
                </div>
                {(roles.includes("admin")) && (
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button onClick={() => { setEditId(r.reminder_id); setShowEdit(true); }} className="text-xs border px-3 py-1 rounded hover:bg-white">Edit</button>
                    <button onClick={() => { setDeleteId(r.reminder_id); setConfirmOpen(true); }} className="text-xs border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}