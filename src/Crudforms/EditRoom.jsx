import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function EditRoom({ id, onClose, refresh }) {
    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        fetch(`http://localhost:5000/api/rooms/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setRoomName(data.room_name);
                setChairNumber(data.chair_number);
                setDepartmentId(data.department_id); 
            })
            .catch(() => setAlert({ show: true, message: "Failed to load room", type: "error" }));

        fetch("http://localhost:5000/api/departments", { credentials: "include" })
            .then(res => res.json())
            .then(data => setDepartments(data));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room_name: roomName,
                    chair_number: Number(chairNumber),
                    department_id: Number(departmentId)
                }),
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
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 relative">
                <button type="button" onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
                <h2 className="text-xl font-bold text-teal-700">Edit Room</h2>
                <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />
                <label className="text-sm">Room Name</label>
                <input value={roomName} onChange={(e) => setRoomName(e.target.value)} className="w-full border p-2 rounded" />
                <label className="text-sm">Chairs</label>
                <input type="number" value={chairNumber} onChange={(e) => setChairNumber(e.target.value)} className="w-full border p-2 rounded" />
                <label className="text-sm">Department</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className="w-full border p-2 rounded">
                    <option value="">Select a Department</option>
                    {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
                </select>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={onClose} className="w-1/2 border p-2 rounded">Cancel</button>
                    <button className="bg-teal-600 text-white w-1/2 p-2 rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
}