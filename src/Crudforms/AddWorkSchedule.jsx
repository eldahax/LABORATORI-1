import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddWorkSchedule({ onClose, refresh }) {
    const [doctorId, setDoctorId] = useState("");
    const [scheduleDay, setScheduleDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");
    const [allDoctors, setAllDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        fetch("http://localhost:5000/api/doctors", { credentials: "include" })
            .then(res => res.json())
            .then(data => setAllDoctors(data))
            .catch(() => setAlert({ show: true, message: "Failed doctors", type: "error" }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        let newErrors = {};
        if (!doctorId) newErrors.doctor = "Doctor is required";
        if (!scheduleDay) newErrors.day = "Day is required";
        if (!startTime) newErrors.start = "Start time required";
        if (!endTime) newErrors.end = "End time required";
        if (startTime >= endTime) newErrors.end = "End must be after start";

        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/work-schedules", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctor_id: Number(doctorId),
                    schedule_day: scheduleDay,
                    start_time: startTime,
                    end_time: endTime,
                    status: status || "inactive",
                }),
            });

            if (res.ok) {
                refresh();
                onClose();
            } else {
                const data = await res.json();
                setAlert({ show: true, message: data.error || "Error", type: "error" });
            }
        } catch {
            setAlert({ show: true, message: "Server error", type: "error" });
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
            <div className="bg-white p-8 rounded-xl w-full max-w-md relative shadow-2xl">
                <button onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
                <h1 className="text-2xl font-bold text-[#0F766E] text-center mb-6">ADD SCHEDULE</h1>
                <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        <option value="">Select Doctor</option>
                        {allDoctors.map((doc) => (
                            <option key={doc.doctor_id} value={doc.doctor_id}>Dr. {doc.User?.first_name} {doc.User?.last_name}</option>
                        ))}
                    </select>
                    <p className="text-red-500 text-xs">{errors.doctor}</p>

                    <select value={scheduleDay} onChange={(e) => setScheduleDay(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        <option value="">Select Day</option>
                        {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <p className="text-red-500 text-xs">{errors.day}</p>

                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" />
                    <p className="text-red-500 text-xs">{errors.start}</p>

                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" />
                    <p className="text-red-500 text-xs">{errors.end}</p>

                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="w-1/2 border py-2 rounded-lg">Cancel</button>
                        <button type="submit" disabled={loading} className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg">{loading ? "Saving..." : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}