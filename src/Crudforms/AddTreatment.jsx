import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function AddTreatment() {
  const navigate = useNavigate();

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
    const fetchD = async () => {
      const d = await fetch("http://localhost:5000/api/departments", {
        credentials: "include",
      });
      const res = await d.json();
      setDeps(res);
    };
    fetchD();
  }, []);

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

      showAlert("Treatment created successfully", "success");

      setTreatmentName("");
      setPrice("");
      setDescription("");
      setAverageDuration("");
      setDepartmentName("");

      setTimeout(() => navigate("/Treatments"), 900);
    } catch (err) {
      showAlert("Server error", "error");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full max-w-md p-8 rounded-xl">

        <CustomAlert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert((p) => ({ ...p, show: false }))}
        />

        <h1 className="text-[36px] font-bold text-[#0F766E] text-center mb-5">
          ADD TREATMENT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="treatment name"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="average duration"
            value={averageDuration}
            onChange={(e) => setAverageDuration(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <select
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          >
            <option value="">select department</option>

            {deps.map((d) => (
              <option key={d.department_id} value={d.department_name}>
                {d.department_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white py-2 rounded-lg"
          >
            Add Treatment
          </button>

        </form>
      </div>
    </div>
  );
}