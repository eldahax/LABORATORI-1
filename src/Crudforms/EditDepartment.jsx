import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department_name, setDepartmentName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const nameRegex = /^[A-Za-z\s]{3,50}$/;


  useEffect(() => {
    fetch(`http://localhost:5000/api/departments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDepartmentName(data.department_name);
      })
      .catch(() => {});
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameErr("");

    let hasError = false;

    if (!department_name.trim()) {
      setNameErr("Department name is required");
      hasError = true;
    } else if (!nameRegex.test(department_name)) {
      setNameErr("Only letters, 3-50 characters");
      hasError = true;
    }

    if (hasError) return;

    await fetch(`http://localhost:5000/api/departments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        department_name,
      }),
    });

    navigate("/departments");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Edit Department
        </h1>

        <div>
          <input
            value={department_name}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Department Name"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{nameErr}</p>
        </div>

        <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
          Update Department
        </button>
      </form>
    </div>
  );
}