import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [department, setDepartment] = useState("");

    const [signupErr, setSignupErr] = useState("");

    const [roomErr, setRoomErr] = useState("");
    const [chairErr, setChairErr] = useState("");
    const [departmentErr, setDepartmentErr] = useState("");

    const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

    const departments = [
        "General Dentistry",
        "Orthodontics",
        "Endodontics",
        "Prosthodontics",
        "Cosmetic Dentistry",
        "Pediatric Dentistry"
    ];

    useEffect(() => {
        fetch(`http://localhost:5000/api/rooms/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoomName(data.room_name || "");
                setChairNumber(data.chair_number || "");
                setDepartment(data.Department?.department_name || "");
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setRoomErr("");
        setChairErr("");
        setDepartmentErr("");
        setSignupErr("");

        let hasError = false;

        if (roomName.trim() === "") {
            setRoomErr("Room name is required");
            hasError = true;
        } else if (!nameRegex.test(roomName)) {
            setRoomErr("Invalid room name");
            hasError = true;
        }

        if (chairNumber === "" || Number(chairNumber) <= 0) {
            setChairErr("Chair number must be greater than 0");
            hasError = true;
        }

        if (department === "") {
            setDepartmentErr("Department is required");
            hasError = true;
        }

        if (hasError) return;

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

            const data = await res.json();

            if (!res.ok) {
                setSignupErr(data.error || "Update failed");
                return;
            }

            alert("Room updated successfully!");
            navigate("/rooms");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-md p-8 rounded-xl">

                <h1 className="text-[36px] font-bold text-[#0F766E] text-center tracking-widest mb-5">
                    EDIT ROOM
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col pt-4">
                        <input
                            type="text"
                            placeholder="room name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        />
                        <p className="text-red-500 pl-[4px]">{roomErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="number"
                            placeholder="chair number"
                            value={chairNumber}
                            onChange={(e) => setChairNumber(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        />
                        <p className="text-red-500 pl-[4px]">{chairErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
                        >
                            <option value="">select department</option>
                            {departments.map((d, i) => (
                                <option key={i} value={d}>{d}</option>
                            ))}
                        </select>
                        <p className="text-red-500 pl-[4px]">{departmentErr}</p>
                    </div>

                    {signupErr && (
                        <p className="text-red-500 text-center font-semibold">
                            {signupErr}
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/rooms")}
                            className="w-1/2 border-[2px] border-gray-300 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-[#0F766E] text-white font-bold py-2 rounded-lg hover:bg-[#134E4A]"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}