import { useState } from "react";

export default function AddRoom() {
    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const [errors, setErrors] = useState({});

    const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

    const departments = [
        "General Dentistry",
        "Orthodontics",
        "Endodontics",
        "Prosthodontics",
        "Cosmetic Dentistry",
        "Pediatric Dentistry"
    ];

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

        if (!departmentName) {
            newErrors.departmentName = "Department is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const res = await fetch("http://localhost:5000/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    room_name: roomName,
                    chair_number: chairNumber,
                    department_name: departmentName
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            alert("Room created successfully");

            setRoomName("");
            setChairNumber("");
            setDepartmentName("");
            setErrors({});
        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white p-6 rounded-xl flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-[#0F766E] text-center">
                    ADD ROOM
                </h1>

                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{errors.roomName}</p>
                </div>

                <div className="flex flex-col">
                    <input
                        type="number"
                        placeholder="Chair Number"
                        value={chairNumber}
                        onChange={(e) => setChairNumber(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{errors.chairNumber}</p>
                </div>

                <div className="flex flex-col">
                    <select
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    >
                        <option value="">Select Department</option>
                        {departments.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    <p className="text-red-500 text-sm">{errors.departmentName}</p>
                </div>

                <button
                    type="submit"
                    className="bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#134E4A]"
                >
                    Create Room
                </button>
            </form>
        </div>
    );
}