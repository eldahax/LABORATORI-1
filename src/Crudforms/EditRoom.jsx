import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [errors, setErrors] = useState({});

    const departments = [
        "General Dentistry",
        "Orthodontics",
        "Endodontics",
        "Prosthodontics",
        "Cosmetic Dentistry",
        "Pediatric Dentistry"
    ];

    const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

    useEffect(() => {
        fetch(`http://localhost:5000/api/rooms/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoomName(data.room_name || "");
                setChairNumber(data.chair_number || "");
                setDepartment(data.Department?.department_name || "");
            })
            .catch((err) => console.log("Error fetching room:", err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!roomName.trim()) {
            newErrors.roomName = "Room name is required";
        } else if (!nameRegex.test(roomName)) {
            newErrors.roomName = "Invalid room name";
        }

        if (!chairNumber || Number(chairNumber) <= 0) {
            newErrors.chairNumber = "Chair number must be greater than 0";
        }

        if (!department) {
            newErrors.department = "Department is required";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room_name: roomName,
                    chair_number: chairNumber,
                    department_name: department
                }),
            });

            if (!res.ok) {
                alert("Update failed");
                return;
            }

            alert("Room updated successfully");
            navigate("/rooms");
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-[#0F766E] text-center uppercase">
                    Edit Room #{id}
                </h1>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 ml-1">
                        Room Name
                    </label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{errors.roomName}</p>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 ml-1">
                        Chair Number
                    </label>
                    <input
                        type="number"
                        value={chairNumber}
                        onChange={(e) => setChairNumber(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{errors.chairNumber}</p>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 ml-1">
                        Department
                    </label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    >
                        <option value="">Select Department</option>
                        {departments.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    <p className="text-red-500 text-sm">{errors.department}</p>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/rooms")}
                        className="w-1/2 border-2 border-gray-300 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#134E4A]"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}