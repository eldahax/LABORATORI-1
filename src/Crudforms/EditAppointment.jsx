import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

function EditAppointmentForm({ appointmentId, onClose, onSuccess }) {
  const [doctorId, setDoctorId] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState("pending");
  const [patientName, setPatientName] = useState("");

  const [allDoctors, setAllDoctors] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const statusOptions = ["pending", "confirmed", "cancelled", "complete"];
  useEffect(() => {
    if (!appointmentId) return;

    const loadAppointmentData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
          credentials: "include",
        });
        const data = await res.json();

        setDoctorId(data.doctor_id || "");
        setTreatmentName(data.description || "");
        setStatus(data.appointment_status || "pending");
        setPatientName(
          data.Patient?.User
            ? `${data.Patient.User.first_name} ${data.Patient.User.last_name}`
            : ""
        );

        if (data.appointment_date_time) {
          setDateTime(data.appointment_date_time.slice(0, 16));
        }
      } catch (err) {
        console.error("ERROR LOADING APPOINTMENT:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointmentData();
  }, [appointmentId]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then(setAllDoctors)
      .catch(() =>
        setAlert({
          show: true,
          message: "Error loading doctors options list",
          type: "error",
        })
      );

 fetch("http://localhost:5000/api/treatments")
      .then((res) => res.json())
      .then(setAllTreatments)
      .catch(() =>
        setAlert({
          show: true,
          message: "Error loading treatments list",
          type: "error",
        })
      );
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!doctorId) newErrors.doctor = "Please select a doctor";
    if (!treatmentName) newErrors.treatment = "Please select a treatment type";
    if (!dateTime) newErrors.date = "Please select a valid date & time entry";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: Number(doctorId),
          appointment_date_time: dateTime,
          description: treatmentName,
          status: status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Update cycle failed",
          type: "error",
        });
        return;
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setAlert({
        show: true,
        message: "Server update response failure",
        type: "error",
      });
    }
  };

  return (
    <>
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl flex flex-col gap-5 relative text-black shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer transition"
        >
          ✕
        </button>
        
        <h1 className="text-xl font-bold text-[#0F766E] border-b pb-2 uppercase tracking-wide">
          Edit Appointment Details
        </h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-medium">
            Loading appointment context...
          </div>
        ) : (
          <>
            {patientName && (
              <p className="text-sm text-gray-500 font-semibold bg-gray-50 p-2.5 rounded-lg border border-gray-150">
                Patient target context:{" "}
                <span className="text-[#0F766E] font-bold">{patientName}</span>
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1">
                  Assigned Practitioner
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                >
                  <option value="">Select Doctor</option>
                  {allDoctors.map((doc) => (
                    <option key={doc.doctor_id} value={doc.doctor_id}>
                      Dr. {doc.User?.first_name} {doc.User?.last_name}
                    </option>
                  ))}
                </select>
                {errors.doctor && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.doctor}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1">
                  Appointment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.date}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-black mb-1">
                  Treatment Category
                </label>
                <select
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                >
                  <option value="">Select Treatment</option>
                  {allTreatments.map((t) => (
                    <option key={t.treatment_id} value={t.treatment_name}>
                      {t.treatment_name}
                    </option>
                  ))}
                </select>
                {errors.treatment && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.treatment}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border rounded-md font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0F766E] text-white font-bold shadow-md text-sm rounded-md hover:bg-teal-800 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default function EditAppointmentModal({ show, appointmentId, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <EditAppointmentForm
        appointmentId={appointmentId}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </div>
  );
}
