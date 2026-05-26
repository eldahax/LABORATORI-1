import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function EditDepartment({ id, onClose, refresh }) {
  const [department_name, setDepartmentName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetch(`http://localhost:5000/api/departments/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDepartmentName(data.department_name))
      .catch(() => setAlert({ show: true, message: "Load failed", type: "error" }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department_name.trim()) { setNameErr("Required"); return; }

    try {
      const res = await fetch(`http://localhost:5000/api/departments/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department_name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setAlert({ show: true, message: data.error || "Update failed", type: "error" });
        return;
      }
      refresh();
      onClose();
    } catch {
      setAlert({ show: true, message: "Server error", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
      <form onSubmit={handleSubmit} className="w-[450px] bg-white p-8 rounded-2xl shadow-lg space-y-4 relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
        <h1 className="text-2xl font-bold text-[#134E4A] text-center">Edit Department</h1>
        <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />
        <div>
          <label className="text-sm font-medium">Department Name</label>
          <input value={department_name} onChange={(e) => setDepartmentName(e.target.value)} className="p-3 border w-full rounded-lg" />
          <p className="text-red-500 text-xs">{nameErr}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="w-1/2 border py-3 rounded-lg">Cancel</button>
          <button className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg font-semibold">Update</button>
        </div>
      </form>
    </div>
  );
}