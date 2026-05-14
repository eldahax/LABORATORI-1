import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [doctorId, setDoctorId] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState("pending");
  const [patientName, setPatientName] = useState(""); // Read-only reference

  const [allDoctors, setAllDoctors] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);
  const statusOptions = ["pending", "confirmed", "cancelled", "complete"];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    fetch(`http://localhost:5000/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctorId(data.doctor_id || "");
        setTreatmentName(data.description || "");
        setStatus(data.appointment_status || "pending");
        setPatientName(`${data.Patient?.User?.first_name} ${data.Patient?.User?.last_name}`);
        
      
        if (data.appointment_date_time) {
          const date = new Date(data.appointment_date_time);
          setDateTime(date.toISOString().slice(0, 16));
        }
      })
      .catch((err) => console.error("Error fetching appointment:", err));

 
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setAllDoctors(data))
      .catch((err) => console.error(err));

    
    fetch("http://localhost:5000/api/treatments")
      .then((res) => res.json())
      .then((data) => setAllTreatments(data))
      .catch((err) => console.error(err));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!doctorId) newErrors.doctor = "Please select a doctor";
    if (!treatmentName) newErrors.treatment = "Please select a treatment";
    if (!dateTime) newErrors.date = "Please select a date and time";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: Number(doctorId),
          appointment_date_time: dateTime,
          description: treatmentName, 
          status: status
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update failed");
        return;
      }

      alert("Appointment updated successfully");
      navigate("/appointments");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center uppercase">
          Edit Appointment
        </h1>

        <p className="text-sm text-gray-500 font-medium italic">
          Editing appointment for: <span className="text-gray-800">{patientName}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
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
            {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
          </div>

        
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">Appointment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2 outline-none bg-white"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2 outline-none"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

        
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">Treatment Type</label>
            <select
              value={treatmentName}
              onChange={(e) => setTreatmentName(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2 outline-none"
            >
              <option value="">Select Treatment</option>
              {allTreatments.map((t) => (
                <option key={t.treatment_id} value={t.treatment_name}>
                  {t.treatment_name}
                </option>
              ))}
            </select>
            {errors.treatment && <p className="text-red-500 text-xs mt-1">{errors.treatment}</p>}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/appointments")}
            className="w-1/2 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg font-bold hover:bg-[#134E4A] shadow-md transition"
          >
            Update Appointment
          </button>
        </div>
      </form>
    </div>
  );
}