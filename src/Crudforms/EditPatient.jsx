import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Update</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to update this patient?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditPatient({ show, onClose, patientId }) {
  const { id: urlId } = useParams();
  const id = patientId || urlId;

  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    allergy_name: ""
  });

  const [nameErr, setNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  useEffect(() => {
    if (!show || !id) return; 

    fetch(`http://localhost:5000/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          first_name: data?.User?.first_name || "",
          last_name: data?.User?.last_name || "",
          email: data?.User?.email || "",
          phone_number: data?.User?.phone_number || "",
          allergy_name: data?.PatientAllergies?.[0]?.allergy_name || ""
        });
      })
      .catch(() => {});
  }, [id, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameErr("");
    setLastNameErr("");
    setEmailErr("");

    let hasError = false;

    if (!form.first_name.trim()) {
      setNameErr("First name is required");
      hasError = true;
    } else if (!nameRegex.test(form.first_name)) {
      setNameErr("First name must be 3-15 letters only");
      hasError = true;
    }

    if (!form.last_name.trim()) {
      setLastNameErr("Last name is required");
      hasError = true;
    } else if (!nameRegex.test(form.last_name)) {
      setLastNameErr("Last name must be 3-15 letters only");
      hasError = true;
    }

    if (!form.email.trim()) {
      setEmailErr("Email is required");
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      setEmailErr("Invalid email format");
      hasError = true;
    }

    if (hasError) return;

    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setAlertState({ show: true, message: data.error || "Update failed", type: "error" });
        return;
      }

      setConfirmOpen(false);
      onClose(); 
      navigate("/Staff");
    } catch (err) {
      setAlertState({ show: true, message: "Server error", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      
      <ConfirmModal
        show={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmUpdate}
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white rounded-2xl space-y-2 p-8 shadow-lg relative"
      >
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-[#134E4A] text-center mb-4">
          Edit Patient
        </h1>

        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
        />
        <p className="text-red-500 text-sm h-5">{nameErr}</p>

        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
        />
        <p className="text-red-500 text-sm h-5">{lastNameErr}</p>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
        />
        <p className="text-red-500 text-sm h-5">{emailErr}</p>

        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
        />
        <div className="h-5"></div> 

        <input
          name="allergy_name"
          value={form.allergy_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
        />
        <div className="h-5"></div>

        <div className="flex gap-3 pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="w-1/2 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button type="submit" className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
            Update Patient
          </button>
        </div>
      </form>

      <CustomAlert
        show={alertState.show}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState({ show: false, message: "", type: "error" })}
      />
    </div>
  );
}