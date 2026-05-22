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
          Are you sure you want to delete this reminder?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
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

export default function TableReminder() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/reminders",{
      credentials:"include"
    })
      .then((res) => res.json())
      .then((data) => {
        setReminders(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });

    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" });
    }, 2500);
  };


  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };


  const confirmDelete = async () => {
    try {
     const res = await fetch(
  `http://localhost:5000/api/reminders/${deleteId}`,
  {
    method: "DELETE",
    credentials: "include",
  }
);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showAlert(data.error || "Delete failed", "error");
        return;
      }

      setReminders((prev) =>
        prev.filter((r) => r.reminder_id !== deleteId)
      );

      showAlert("Reminder deleted successfully", "success");
      setDeleteId(null);
    } catch (err) {
      showAlert("Server error", "error");
      setDeleteId(null);
    }
  };

  const handleMarkAsSent = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reminders/${id}/sent`,
        { method: "PATCH" }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showAlert(data.error || "Update failed", "error");
        return;
      }

      setReminders((prev) =>
        prev.map((r) =>
          r.reminder_id === id ? { ...r, sent: true } : r
        )
      );

      showAlert("Marked as sent", "success");
    } catch (err) {
      showAlert("Server error", "error");
    }
  };

  const getPatientName = (r) => {
    const u = r?.Appointment?.Patient?.User;
    return u ? `${u.first_name} ${u.last_name}` : "Unknown";
  };

  const getDoctorName = (r) => {
    const u = r?.Appointment?.Doctor?.User;
    return u ? `Dr. ${u.first_name} ${u.last_name}` : "Unknown";
  };

  const formatDate = (d) => {
    const date = new Date(d);
    return isNaN(date.getTime()) ? "Invalid" : date.toLocaleString();
  };

  const getStatus = (r) => {
    if (r.sent) return "sent";

    const now = new Date();
    const rd = new Date(r.reminder_date);

    if (rd < now) return "overdue";

    const diffH = (rd - now) / (1000 * 60 * 60);
    if (diffH <= 24) return "due soon";

    return "pending";
  };

  const filtered = reminders.filter((r) => {
    const text = (
      getPatientName(r) +
      " " +
      getDoctorName(r) +
      " " +
      (r.message || "")
    ).toLowerCase();

    return (
      text.includes(search.toLowerCase()) &&
      (statusFilter === "all" || getStatus(r) === statusFilter)
    );
  });

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 md:ml-[25%]">
        <Navbar />

        <main className="pt-[90px] px-6">

          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() =>
              setAlert({ show: false, message: "", type: "success" })
            }
          />

          <ConfirmModal
            show={deleteId !== null}
            onCancel={() => setDeleteId(null)}
            onConfirm={confirmDelete}
          />

          <div className="flex gap-3 mb-6">
            <input
              className="border p-3 rounded-lg flex-1"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-3 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="due soon">Due Soon</option>
              <option value="overdue">Overdue</option>
              <option value="sent">Sent</option>
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div key={r.reminder_id} className="bg-white p-5 rounded-xl shadow">

                <p className="font-bold text-[#0F766E]">Reminder</p>

                <div className="text-sm space-y-1 mt-2">
                  <p><b>Patient:</b> {getPatientName(r)}</p>
                  <p><b>Doctor:</b> {getDoctorName(r)}</p>
                  <p><b>Message:</b> {r.message}</p>
                  <p><b>Date:</b> {formatDate(r.reminder_date)}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/reminders/edit/${r.reminder_id}`)
                    }
                    className="border px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {!r.sent && (
                    <button
                      onClick={() => handleMarkAsSent(r.reminder_id)}
                      className="border px-3 py-1 rounded text-blue-600"
                    >
                      Sent
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteClick(r.reminder_id)}
                    className="border px-3 py-1 rounded text-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}