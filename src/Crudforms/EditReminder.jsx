import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditReminder() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [appointmentId, setAppointmentId] = useState("");
    const [message, setMessage] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [sent, setSent] = useState(false);

    const [appointments, setAppointments] = useState([]);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const formatDateForInput = (date) => {
        if (!date) return "";
        const parsed = new Date(date);

        if (isNaN(parsed.getTime())) return "";

        const local = new Date(
            parsed.getTime() - parsed.getTimezoneOffset() * 60000
        );

        return local.toISOString().slice(0, 16);
    };

    useEffect(() => {
        setServerError("");

        fetch("http://localhost:5000/api/appointments")
            .then((res) => res.json())
            .then((appointmentsData) => {
                setAppointments(
                    Array.isArray(appointmentsData)
                        ? appointmentsData
                        : appointmentsData.data || []
                );
            })
            .catch((err) => {
                console.error(err);
                setServerError("Failed to load appointments");
            });

        fetch(`http://localhost:5000/api/reminders/${id}`)
            .then((res) => res.json())
            .then((reminderData) => {
                if (!reminderData) {
                    setServerError("Reminder not found");
                    return;
                }

                const reminder = reminderData.data;

                setAppointmentId(reminder?.appointment_id || "");
                setMessage(reminder?.message || "");
                setReminderDate(formatDateForInput(reminder?.reminder_date));
                setSent(reminder?.sent ? true : false);
            })
            .catch((err) => {
                console.error(err);
                setServerError("Failed to load reminder");
            });
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!appointmentId) newErrors.appointmentId = "Appointment is required";
        if (!message) newErrors.message = "Message is required";
        if (!reminderDate) newErrors.reminderDate = "Reminder date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        fetch(`http://localhost:5000/api/reminders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                appointment_id: Number(appointmentId),
                message: message,
                reminder_date: reminderDate,
                sent: sent,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) {
                    alert(data.message || "Update failed");
                    return;
                }

                navigate("/reminders");
            })
            .catch((err) => {
                console.error(err);
                alert("Server error");
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#0F766E] mb-2">
                    Edit Reminder
                </h1>

                <p className="text-gray-500 mb-6">Update reminder details</p>

                {serverError && (
                    <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-xs font-semibold text-gray-500">
                            Appointment
                        </label>

                        <select
                            value={appointmentId}
                            onChange={(e) => setAppointmentId(e.target.value)}
                            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">Select Appointment</option>

                            {appointments.map((a) => (
                                <option key={a.appointment_id} value={a.appointment_id}>
                                    {a.Patient?.User?.first_name}{" "}
                                    {a.Patient?.User?.last_name} → Dr.{" "}
                                    {a.Doctor?.User?.first_name}{" "}
                                    {a.Doctor?.User?.last_name}
                                </option>
                            ))}
                        </select>

                        {errors.appointmentId && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.appointmentId}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500">
                            Message
                        </label>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                            rows="4"
                        />

                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500">
                            Reminder Date
                        </label>

                        <input
                            type="datetime-local"
                            value={reminderDate}
                            onChange={(e) => setReminderDate(e.target.value)}
                            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                        />

                        {errors.reminderDate && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reminderDate}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={sent}
                            onChange={(e) => setSent(e.target.checked)}
                        />
                        <label className="text-sm text-gray-600">
                            Mark as sent
                        </label>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/reminders")}
                            className="w-1/2 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-bold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg font-bold"
                        >
                            Update Reminder
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}