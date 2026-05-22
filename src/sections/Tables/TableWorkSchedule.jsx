import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

function ConfirmModal({ show, onConfirm, onCancel, loading }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this work schedule?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TableWorkSchedule() {
  const [workSchedules, setWorkSchedules] = useState([]);
  const [search, setSearch] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/work-schedules", {
  credentials: "include",
})
      .then((res) => res.json())
      .then((data) => setWorkSchedules(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load work schedules",
          type: "error",
        })
      );
  }, []);

  const grouped = workSchedules.reduce((acc, ws) => {
    const doctorId = ws.doctor_id;

    if (!acc[doctorId]) {
      acc[doctorId] = {
        doctor_id: doctorId,
        doctor: ws?.Doctor,
        schedules: [],
      };
    }

    acc[doctorId].schedules.push(ws);
    return acc;
  }, {});

  const filteredGrouped = Object.values(grouped).map((group) => ({
    ...group,
    schedules: group.schedules.filter((ws) =>
      (ws.schedule_day || "").toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/work-schedules/${deleteId}`,
        { method: "DELETE" }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Delete failed",
          type: "error",
        });
        return;
      }

      setWorkSchedules((prev) =>
        prev.filter((ws) => ws.work_schedule_id !== deleteId)
      );

      setAlert({
        show: true,
        message: "Work schedule deleted successfully",
        type: "success",
      });

      setConfirmOpen(false);
      setDeleteId(null);
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <Navbar />

      <div className="min-h-screen flex mt-[50px]">
        <Sidebar />

        <div className="w-3/4 ml-[25%] p-10">

          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() =>
              setAlert((p) => ({ ...p, show: false }))
            }
          />

          <ConfirmModal
            show={confirmOpen}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            loading={loading}
          />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-[#0F766E]">
              Work Schedules
            </h1>

            <button
              onClick={() => navigate("/add-work-schedule")}
              className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
            >
              + Add Work Schedule
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by day..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded mb-6 w-full"
          />

          <div className="space-y-6">
            {filteredGrouped.map((group) => (
              <div
                key={group.doctor_id}
                className="bg-gray-50 border rounded-xl p-4"
              >
                <h2 className="font-bold text-[#0F766E] mb-3 text-lg">
                  {group.doctor?.User
                    ? `Dr. ${group.doctor.User.first_name} ${group.doctor.User.last_name}`
                    : `Doctor #${group.doctor_id}`}
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {group.schedules.map((ws) => (
                    <div
                      key={ws.work_schedule_id}
                      className="min-w-[220px] bg-white border rounded-lg p-3 shadow-sm flex-shrink-0"
                    >
                      <p className="text-sm font-semibold">
                        {ws.schedule_day}
                      </p>

                      <p className="text-xs text-gray-600">
                        {ws.start_time} - {ws.end_time}
                      </p>

                      <p className="text-xs mt-1">
                        Status:{" "}
                        <span
                          className={
                            ws.status === "active"
                              ? "text-green-600 font-semibold"
                              : "text-red-500 font-semibold"
                          }
                        >
                          {ws.status}
                        </span>
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/work-schedules/edit/${ws.work_schedule_id}`
                            )
                          }
                          className="text-xs border px-2 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            openDeleteModal(ws.work_schedule_id)
                          }
                          className="text-xs border border-red-500 text-red-500 px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}