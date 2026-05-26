import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddRoom({ onClose, refresh }) {
    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDep] = useState([]);
    const [roomErr, setRoomErr] = useState("");
    const [chairErr, setChairErr] = useState("");
    const [departmentErr, setDepartmentErr] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        fetch("http://localhost:5000/api/departments", { credentials: "include" })
            .then(res => res.json())
            .then(data => setDep(data))
            .catch(() => setAlert({ show: true, message: "Failed loading departments", type: "error" }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRoomErr(""); setChairErr(""); setDepartmentErr("");
        let hasError = false;
        if (!roomName.trim()) { setRoomErr("Room name required"); hasError = true; }
        if (!chairNumber || Number(chairNumber) <= 0) { setChairErr("Chair number > 0"); hasError = true; }
        if (!departmentId) { setDepartmentErr("Department required"); hasError = true; }
        if (hasError) return;

        try {
            const res = await fetch("http://localhost:5000/api/rooms", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room_name: roomName,
                    chair_number: Number(chairNumber),
                    department_id: Number(departmentId)
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setAlert({ show: true, message: data.error || "Failed adding room", type: "error" });
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
                <h2 className="text-xl font-bold text-[#0F766E]">Add New Room</h2>
                <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert(p => ({ ...p, show: false }))} />
                <input placeholder="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-xs">{roomErr}</p>
                <input type="number" placeholder="Chair number" value={chairNumber} onChange={(e) => setChairNumber(e.target.value)} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-xs">{chairErr}</p>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className="w-full border p-2 rounded">
                    <option value="">Select department</option>
                    {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
                </select>
                <p className="text-red-500 text-xs">{departmentErr}</p>
                <div className="flex gap-2">
                    <button type="button" onClick={onClose} className="w-1/2 border p-2 rounded">Cancel</button>
                    <button className="w-1/2 bg-teal-600 text-white p-2 rounded">Add Room</button>
                </div>
            </form>
        </div>
    );
}