import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDepartment() {
  const navigate = useNavigate();

  const [department_name, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
    const [signupErr, setSignupErr] = useState("");

  const nameRegex = /^[A-Za-z\s]{3,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameErr("");
    setDescErr("");

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

    if (hasError) return;
    try {
   const res= await fetch("http://localhost:5000/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        department_name
      }),
    });
    
      const data = await res.json();

      if (!res.ok) {
        setSignupErr(data.error || "Something went wrong");
        return;
      }

      alert("department created successfully!");

      setDepartmentName("");
      setDescription("");
    } catch (err) {
      console.error("Submission Error:", err);
      setSignupErr("Failed to connect to the server.");
    }
    setSignupErr("");

    navigate("/departments");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Create Department
        </h1>

      
        <div>
          <label className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            value={department_name}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Department Name"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <p className="text-red-500 text-sm h-5">{nameErr}</p>
        </div>

       
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-3 border w-full rounded-lg h-24 focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <p className="text-red-500 text-sm h-5">{descErr}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold hover:bg-[#134E4A]"
        >
          Create Department
        </button>
      </form>
    </div>
  );
}