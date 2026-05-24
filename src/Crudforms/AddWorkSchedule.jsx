import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function AddWorkSchedule() {
    const navigate = useNavigate();

    const [doctorId, setDoctorId] = useState("");
    const [scheduleDay, setScheduleDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");

    const [allDoctors, setAllDoctors] = useState([]);

    const [loading, setLoading] = useState(false);

    const [doctorErr, setDoctorErr] = useState("");
    const [dayErr, setDayErr] = useState("");
    const [startTimeErr, setStartTimeErr] = useState("");
    const [endTimeErr, setEndTimeErr] = useState("");
    const [signupErr, setSignupErr] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/doctors", {
                    credentials: "include",
                });
                const data = await res.json();
                setAllDoctors(data);
            } catch {
                setAlert({
                    show: true,
                    message: "Failed to load doctors",
                    type: "error",
                });
            }
        };

        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        setDoctorErr("");
        setDayErr("");
        setStartTimeErr("");
        setEndTimeErr("");
        setSignupErr("");

        let hasError = false;

        if (!doctorId) {
            setDoctorErr("Doctor is required");
            hasError = true;
        }

        if (!scheduleDay) {
            setDayErr("Schedule day is required");
            hasError = true;
        }

        if (!startTime) {
            setStartTimeErr("Start time is required");
            hasError = true;
        }

        if (!endTime) {
            setEndTimeErr("End time is required");
            hasError = true;
        }

        if (startTime && endTime && startTime >= endTime) {
            setEndTimeErr("End time must be after start time");
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:5000/api/work-schedules",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        doctor_id: Number(doctorId),
                        schedule_day: scheduleDay,
                        start_time: startTime,
                        end_time: endTime,
                        status: status || "inactive",
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setSignupErr(data.error || "Something went wrong");
                setLoading(false);
                return;
            }

            setAlert({
                show: true,
                message: "Work schedule created successfully",
                type: "success",
            });

            setDoctorId("");
            setScheduleDay("");
            setStartTime("");
            setEndTime("");
            setStatus("");

            setTimeout(() => navigate("/work-schedules"), 1000);
        } catch {
            setSignupErr("Server error");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 px-4">
            <CustomAlert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-[#0F766E] text-center mb-6">
                    ADD WORK SCHEDULE
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">


                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-500 mb-1">
                            Assigned Doctor
                        </label>

                        <select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">Select Doctor</option>
                            {allDoctors.map((doc) => (
                                <option key={doc.doctor_id} value={doc.doctor_id}>
                                    Dr. {doc.User?.first_name} {doc.User?.last_name}
                                </option>
                            ))}
                        </select>

                        <p className="text-red-500 text-sm">{doctorErr}</p>
                    </div>


                    <div className="flex flex-col">
                        <select
                            value={scheduleDay}
                            onChange={(e) => setScheduleDay(e.target.value)}
                            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">Select Day</option>
                            {daysOfWeek.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                        <p className="text-red-500 text-sm">{dayErr}</p>
                    </div>


                    <div className="flex flex-col">
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        />

                        <p className="text-red-500 text-sm">{startTimeErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        />

                        <p className="text-red-500 text-sm">{endTimeErr}</p>
                    </div>


                    <div className="flex flex-col">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">Select Status (optional)</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {signupErr && (
                        <p className="text-red-500 text-center font-semibold">
                            {signupErr}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0F766E] text-white font-bold py-2 rounded-lg disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Add Work Schedule"}
                    </button>
                </form>
            </div>
        </div>
    );
}