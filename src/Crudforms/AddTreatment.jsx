import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddTreatment({ show, onClose }) {
  const [treatmentName, setTreatmentName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [averageDuration, setAverageDuration] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const [deps, setDeps] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
  };

  useEffect(() => {
    if (!show) return;
    const fetchD = async () => {
      const d = await fetch("http://localhost:5000/api/departments", {
        credentials: "include",
      });
      const res = await d.json();
      setDeps(res);
    };
    fetchD();
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!treatmentName || !price || !description || !averageDuration || !departmentName) {
      showAlert("All fields are required", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/treatments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          treatment_name: treatmentName,
          price,
          description,
          average_duration: averageDuration,
          department_name: departmentName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.error || "Create failed", "error");
        return;
      }

      setTreatmentName("");
      setPrice("");
      setDescription("");
      setAverageDuration("");
      setDepartmentName("");

      onClose();
    } catch (err) {
      showAlert("Server error", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h1 className="text-[30px] font-bold text-[#0F766E] text-center mb-5">
          ADD TREATMENT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="treatment name"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
            className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <input
            type="number"
            placeholder="average duration"
            value={averageDuration}
            onChange={(e) => setAverageDuration(e.target.value)}
            className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <select
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          >
            <option value="">select department</option>
            {deps.map((d) => (
              <option key={d.department_id} value={d.department_name}>
                {d.department_name}
              </option>
            ))}
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-[#0F766E] text-white py-2 rounded hover:bg-[#134E4A]"
            >
              Create Treatment
            </button>
          </div>
        </form>
      </div>

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />
    </div>
  );
}