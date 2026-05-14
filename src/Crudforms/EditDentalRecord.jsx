import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDentalRecord() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [tooth, setTooth] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  const [submitErr, setSubmitErr] = useState("");
  const [toothErr, setToothErr] = useState("");
  const [conditionErr, setConditionErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/dental-history/${id}`);
        const data = await res.json();

        const record = data?.data || data;

        if (!record) return;

        setPatientName(
          `${record.Patient?.User?.first_name || ""} ${record.Patient?.User?.last_name || ""}`
        );

        setDoctorName(
          `${record.Doctor?.User?.first_name || ""} ${record.Doctor?.User?.last_name || ""}`
        );

        setTooth(record.tooth || "");
        setCondition(record.dental_condition || "");
        setNotes(record.notes || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitErr("");
    setToothErr("");
    setConditionErr("");

    let hasError = false;

    if (!tooth.trim()) {
      setToothErr("Tooth is required");
      hasError = true;
    }

    if (!condition.trim()) {
      setConditionErr("Condition is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/dental-history/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tooth,
            dental_condition: condition,
            notes,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setSubmitErr(data.error || "Something went wrong");
        return;
      }

      alert("Dental record updated successfully");
      navigate("/dental-history");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8">

        <h1 className="text-[36px] font-bold text-[#0F766E] text-center mb-5">
          EDIT DENTAL RECORD
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input value={patientName} readOnly className="w-full border px-3 py-2 bg-gray-100 rounded-lg" />
          <input value={doctorName} readOnly className="w-full border px-3 py-2 bg-gray-100 rounded-lg" />

          <div>
            <input value={tooth} onChange={(e) => setTooth(e.target.value)} className="w-full border px-3 py-2 rounded-lg" />
            <p className="text-red-500 text-sm">{toothErr}</p>
          </div>

          <div>
            <input value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border px-3 py-2 rounded-lg" />
            <p className="text-red-500 text-sm">{conditionErr}</p>
          </div>

          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border px-3 py-2 rounded-lg min-h-[120px]" />

          {submitErr && <p className="text-red-500 text-sm">{submitErr}</p>}

          <div className="flex gap-4">
            <button type="button" onClick={() => navigate("/dental-history")} className="w-1/2 border py-2 rounded-lg">
              Cancel
            </button>

            <button type="submit" className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}