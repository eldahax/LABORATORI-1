import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function EditReminder({ id, onClose, refresh }) {
    const [appointmentId, setAppointmentId] = useState("");
    const [message, setMessage] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [sent, setSent] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    const formatDateForInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    useEffect(() => {

        fetch("http://localhost:5000/api/appointments", { credentials: "include" })
            .then(res => res.json())
            .then(data => setAppointments(Array.isArray(data) ? data : data.data || []));


        fetch(`http://localhost:5000/api/reminders/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(res => {
                const data = res.data;
                setAppointmentId(data.appointment_id || "");
                setMessage(data.message || "");
                setReminderDate(formatDateForInput(data.reminder_date));
                setSent(!!data.sent);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/reminders/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appointment_id: Number(appointmentId),
                    message,
                    reminder_date: reminderDate,
                    sent,
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
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
            <div className="bg-white p-8 rounded-xl w-full max-w-md relative shadow-2xl">
                <button onClick={onClose} className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black">×</button>
                <h1 className="text-2xl font-bold text-[#0F766E] text-center mb-6">EDIT REMINDER</h1>

                <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 ml-1">Appointment</label>
                        <select value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2">
                            {appointments.map((a) => (
                                <option key={a.appointment_id} value={a.appointment_id}>
                                    {a.Patient?.User?.first_name} {a.Patient?.User?.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 ml-1">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" rows="3" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 ml-1">Reminder Date & Time</label>
                        <input type="datetime-local" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2" />
                    </div>

                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" id="sent" checked={sent} onChange={(e) => setSent(e.target.checked)} className="w-4 h-4 accent-[#0F766E]" />
                        <label htmlFor="sent" className="text-sm font-medium text-gray-700">Mark as sent</label>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="w-1/2 border py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={loading} className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#0D665F]">
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}