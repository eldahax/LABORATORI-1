import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditWorkSchedule() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [doctorId, setDoctorId] = useState("");
    const [scheduleDay, setScheduleDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");

    const [signupErr, setSignupErr] = useState("");

    const [doctorErr, setDoctorErr] = useState("");
    const [dayErr, setDayErr] = useState("");
    const [startErr, setStartErr] = useState("");
    const [endErr, setEndErr] = useState("");

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
     const [allDoctors, setAllDoctors] = useState([]);
    
        useEffect(() => {
            const fetchDoctors = async () => {
                try {
                    const res = await fetch("http://localhost:5000/api/doctors");
                    const data = await res.json();
                    setAllDoctors(data);
                } catch (err) {
                    console.error("Failed to fetch doctors:", err);
                }
            };
            fetchDoctors();
        }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/api/work-schedules/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setDoctorId(data.doctor_id || "");
                setScheduleDay(data.schedule_day || "");
                setStartTime(data.start_time || "");
                setEndTime(data.end_time || "");
                setStatus(data.status || "");
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDoctorErr("");
        setDayErr("");
        setStartErr("");
        setEndErr("");
        setSignupErr("");

        let hasError = false;

        if (doctorId === "" || Number(doctorId) <= 0) {
            setDoctorErr("Doctor ID must be greater than 0");
            hasError = true;
        }

        if (scheduleDay === "") {
            setDayErr("Schedule day is required");
            hasError = true;
        }

        if (startTime === "") {
            setStartErr("Start time is required");
            hasError = true;
        }

        if (endTime === "") {
            setEndErr("End time is required");
            hasError = true;
        }

        if (
            startTime !== "" &&
            endTime !== "" &&
            startTime >= endTime
        ) {
            setEndErr("End time must be after start time");
            hasError = true;
        }

        if (hasError) return;

        try {
            const res = await fetch(`http://localhost:5000/api/work-schedules/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    schedule_day: scheduleDay,
                    start_time: startTime,
                    end_time: endTime,
                    status: status
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setSignupErr(data.error || "Update failed");
                return;
            }

            alert("Work schedule updated successfully!");
            navigate("/work-schedules");

        } catch (err) {
            console.log(err);
            setSignupErr("Server error");
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-md p-8 rounded-xl">

                <h1 className="text-[36px] font-bold text-[#0F766E] text-center tracking-widest mb-5">
                    EDIT WORK SCHEDULE
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">Assigned Doctor</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2 outline-none"
            >
              <option value="">Select Doctor</option>
              {allDoctors.map((doc) => (
                <option key={doc.doctor_id} value={doc.doctor_id}>
                  Dr. {doc.User?.first_name} {doc.User?.last_name} ({doc.specialization})
                </option>
              ))}
            </select>
          
          </div>

                    <div className="flex flex-col">
                        <select
                            value={scheduleDay}
                            onChange={(e) => setScheduleDay(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">select day</option>

                            {days.map((d, i) => (
                                <option key={i} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                        <p className="text-red-500 pl-[4px]">
                            {dayErr}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        />

                        <p className="text-red-500 pl-[4px]">
                            {startErr}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        />

                        <p className="text-red-500 pl-[4px]">
                            {endErr}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">select status</option>

                            <option value="active">
                                active
                            </option>

                            <option value="inactive">
                                inactive
                            </option>
                        </select>
                    </div>

                    {signupErr && (
                        <p className="text-red-500 text-center font-semibold">
                            {signupErr}
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={() => navigate("/work-schedules")}
                            className="w-1/2 border-[2px] border-gray-300 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-[#0F766E] text-white font-bold py-2 rounded-lg hover:bg-[#134E4A]"
                        >
                            Save
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}