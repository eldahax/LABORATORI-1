import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function CreateDepartment() {
  const navigate = useNavigate();

  const [department_name, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [signupErr, setSignupErr] = useState("");

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const nameRegex = /^[A-Za-z\s]{3,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    setNameErr("");
    setDescErr("");
    setSignupErr("");

    let hasError = false;

    if (!department_name.trim()) {
      setNameErr("Department name is required");
      hasError = true;
    } else if (!nameRegex.test(department_name)) {
      setNameErr("Only letters, 3-50 characters");
      hasError = true;
    }

    if (!description.trim()) {
      setDescErr("Description is required");
      hasError = true;
    } else if (description.length < 10) {
      setDescErr("Description must be at least 10 characters");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/departments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            department_name,
            description,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Failed to create department",
          type: "error",
        });

        setLoading(false);
        return;
      }

      setAlert({
        show: true,
        message: "Department created successfully!",
        type: "success",
      });

      setDepartmentName("");
      setDescription("");

      setLoading(false);

      setTimeout(() => {
        navigate("/departments");
      }, 1000);

    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert((p) => ({ ...p, show: false }))
        }
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Create Department
        </h1>

        <div>
          <label>Department Name</label>

          <input
            value={department_name}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="p-3 border w-full rounded-lg"
          />

          <p className="text-red-500">{nameErr}</p>
        </div>

        <div>
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border w-full rounded-lg h-24"
          />

          <p className="text-red-500">{descErr}</p>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#0F766E] text-white py-3 rounded-lg"
        >
          {loading ? "CREATING..." : "Create Department"}
        </button>
      </form>
    </div>
  );
}