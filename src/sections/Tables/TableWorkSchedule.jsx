import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
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

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [deleteId, setDeleteId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/work-schedules")
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


    const filteredWorkSchedules = workSchedules.filter((ws) => {
        const day = (ws.schedule_day || "").toLowerCase();
        const query = search.toLowerCase();

        return day.includes(query);
    });

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
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
            <Navbar />

            <CustomAlert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() =>
                    setAlert({ show: false, message: "", type: "success" })
                }
            />

            <div className="flex w-full min-h-screen mt-[50px]">
                <Sidebar />

                <div className="w-3/4 p-10 ml-[25%]">
                    <TableCard />

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg font-bold text-[#0F766E]">
                            Work Schedules
                        </h1>

                        <button
                            onClick={() => navigate("/add-work-schedule")}
                            className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
                        >
                            + Add Work Schedule
                        </button>
                    </div>

                 
                    <div className="w-1/2 max-w-sm mb-6">
                        <input
                            type="text"
                            placeholder="Search by day..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                        />
                    </div>

                    <table className="min-w-full text-left text-sm sm:text-base text-black">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 pl-4">ID</th>
                                <th className="py-3">Doctor ID</th>
                                <th className="py-3">Day</th>
                                <th className="py-3">Start</th>
                                <th className="py-3">End</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {filteredWorkSchedules.map((ws) => (
                                <tr
                                    key={ws.work_schedule_id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-4 pl-4">
                                        {ws.work_schedule_id}
                                    </td>

                                    <td>{ws.doctor_id}</td>
                                    <td>{ws.schedule_day}</td>
                                    <td>{ws.start_time}</td>
                                    <td>{ws.end_time}</td>

                                    <td>
                                        <span
                                            className={
                                                ws.status === "active"
                                                    ? "text-green-600 font-semibold"
                                                    : "text-red-500 font-semibold"
                                            }
                                        >
                                            {ws.status}
                                        </span>
                                    </td>

                                    <td className="flex gap-2 py-2">
                                        <button
                                            onClick={() =>
                                                openDeleteModal(ws.work_schedule_id)
                                            }
                                            className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/work-schedules/edit/${ws.work_schedule_id}`
                                                )
                                            }
                                            className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                show={confirmOpen}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
                loading={loading}
            />
        </div>
    );
}