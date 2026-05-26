import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function EditWorkSchedule({ id, onClose, refresh }) {
    const [doctorId, setDoctorId] = useState("");
    const [scheduleDay, setScheduleDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");
    const [allDoctors, setAllDoctors] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {

        fetch("http://localhost:5000/api/doctors", { credentials: "include" })
            .then(res => res.json())
            .then(data => setAllDoctors(data));

        fetch(`http://localhost:5000/api/work-schedules/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setDoctorId(data.doctor_id || "");
                setScheduleDay(data.schedule_day || "");
                setStartTime(data.start_time || "");
                setEndTime(data.end_time || "");
                setStatus(data.status || "");
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/work-schedules/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    schedule_day: scheduleDay,
                    start_time: startTime,
                    end_time: endTime,
                    status,
                }),
            });

            if (res.ok) {
                refresh();
                onClose();
            } else {
                setAlert({ show: true, message: "Update failed", type: "error" });
            }
        } catch {
            setAlert({ show: true, message: "Server error", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
            <div className="bg-white p-8 rounded-xl w-full max-w-md relative shadow-2xl">
                <button onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
                <h1 className="text-2xl font-bold text-[#0F766E] text-center mb-6">EDIT SCHEDULE</h1>

                <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="text-xs font-semibold text-gray-500">Doctor</label>
                    <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        {allDoctors.map((doc) => (
                            <option key={doc.doctor_id} value={doc.doctor_id}>Dr. {doc.User?.first_name} {doc.User?.last_name}</option>
                        ))}
                    </select>

                    <label className="text-xs font-semibold text-gray-500">Day</label>
                    <select value={scheduleDay} onChange={(e) => setScheduleDay(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="text-xs font-semibold text-gray-500">Start</label>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" />
                        </div>
                        <div className="w-1/2">
                            <label className="text-xs font-semibold text-gray-500">End</label>
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" />
                        </div>
                    </div>

                    <label className="text-xs font-semibold text-gray-500">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="w-1/2 border py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg font-bold">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}