import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function CreateDepartment({ onClose, refresh }) {
  const [department_name, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const nameRegex = /^[A-Za-z\s]{3,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setNameErr(""); setDescErr("");

    let hasError = false;
    if (!department_name.trim()) { setNameErr("Required"); hasError = true; }
    else if (!nameRegex.test(department_name)) { setNameErr("3-50 letters only"); hasError = true; }

    if (!description.trim()) { setDescErr("Required"); hasError = true; }
    else if (description.length < 10) { setDescErr("Min 10 characters"); hasError = true; }

    if (hasError) { setLoading(false); return; }

    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department_name, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAlert({ show: true, message: data.error || "Error", type: "error" });
        setLoading(false); return;
      }
      refresh();
      onClose();
    } catch {
      setAlert({ show: true, message: "Server error", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
      <form onSubmit={handleSubmit} className="w-[450px] bg-white rounded-2xl p-6 space-y-4 relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
        <h1 className="text-2xl font-bold text-[#134E4A] text-center">Create Department</h1>
        <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />
        <div>
          <label className="text-sm font-medium">Department Name</label>
          <input value={department_name} onChange={(e) => setDepartmentName(e.target.value)} className="p-2 border w-full rounded-lg" />
          <p className="text-red-500 text-xs">{nameErr}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border w-full rounded-lg h-24" />
          <p className="text-red-500 text-xs">{descErr}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="w-1/2 border py-2 rounded-lg">Cancel</button>
          <button disabled={loading} className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg uppercase font-bold">
            {loading ? "..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}