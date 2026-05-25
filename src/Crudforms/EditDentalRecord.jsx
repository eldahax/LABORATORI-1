import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

function EditDentalForm({ recordId, onClose, onSuccess }) {
  const [doctorId, setDoctorId] = useState("");
  const [tooth, setTooth] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [patientName, setPatientName] = useState("");

  const [allDoctors, setAllDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });


  useEffect(() => {
    if (!recordId) return;

    const controller = new AbortController();

    const loadRecordData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/dental-history/${recordId}`, {
          credentials: "include",
          signal: controller.signal,
        });
        
        const data = await res.json();
        const record = data?.data ?? data;

        if (!record) return;

        setDoctorId(record.doctor_id || "");
        setTooth(record.tooth || "");
        setCondition(record.dental_condition || "");
        setNotes(record.notes || "");
        setPatientName(
          record.Patient?.User
            ? `${record.Patient.User.first_name} ${record.Patient.User.last_name}`
            : ""
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("ERROR LOADING DENTAL RECORD:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecordData();
    return () => controller.abort();
  }, [recordId]);

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
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!doctorId) newErrors.doctor = "Please select a doctor";
    if (!tooth.trim()) newErrors.tooth = "Tooth is required";
    if (!condition.trim()) newErrors.condition = "Condition is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/dental-history/${recordId}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: Number(doctorId),
          tooth: tooth,
          dental_condition: condition,
          notes: notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Update cycle failed";
        setErrors((prev) => ({ ...prev, submit: errorMsg }));
        setAlert({
          show: true,
          message: errorMsg,
          type: "error",
        });
        return;
      }

      setAlert({
        show: true,
        message: "Dental record updated successfully",
        type: "success",
      });

      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server update response failure",
        type: "error",
      });
    } finally {
      setLoading(false);
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
          Edit Dental Record Details
        </h1>

        {loading && !patientName ? (
          <div className="text-center py-12 text-gray-500 font-medium">
            Loading dental record context...
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
                  Tooth Identification
                </label>
                <input
                  type="text"
                  placeholder="e.g., #14, Upper Left Molar"
                  value={tooth}
                  onChange={(e) => setTooth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
                {errors.tooth && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.tooth}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1">
                Dental Condition
              </label>
              <input
                type="text"
                placeholder="e.g., Deep Caries, Fractured"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {errors.condition && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.condition}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-black mb-1">
                Clinical Notes
              </label>
              <textarea
                rows="4"
                placeholder="Provide additional details regarding the treatment plan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E] min-h-[100px]"
              />
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-xs font-medium text-center">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border rounded-md font-semibold text-sm hover:bg-gray-50 transition cursor-pointer text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#0F766E] text-white font-bold shadow-md text-sm rounded-md hover:bg-teal-800 transition cursor-pointer disabled:bg-[#0F766E]/60"
              >
                {loading ? "SAVING..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default function EditDentalModal({ show, recordId, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <EditDentalForm
        recordId={recordId}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </div>
  );
}