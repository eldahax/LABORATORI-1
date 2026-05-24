import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [departments, setDepartments] = useState([]);

    const [error, setError] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success"
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/rooms/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setRoomName(data.room_name);
                setChairNumber(data.chair_number);
                setDepartmentId(data.department_id);
            })
            .catch(() => {
                setAlert({
                    show: true,
                    message: "Failed to load room",
                    type: "error"
                });
            });
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:5000/api/departments", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setDepartments(data))
            .catch(() => {
                setAlert({
                    show: true,
                    message: "Failed to load departments",
                    type: "error"
                });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `http://localhost:5000/api/rooms/${id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        room_name: roomName,
                        chair_number: Number(chairNumber),
                        department_id: Number(departmentId)
                    }),
                }
            );

            if (!res.ok) {
                const data = await res.json();

                setError(data.error);

                setAlert({
                    show: true,
                    message: data.error || "Update failed",
                    type: "error"
                });

                return;
            }

            setAlert({
                show: true,
                message: "Room updated successfully",
                type: "success"
            });

            setTimeout(() => {
                navigate("/rooms");
            }, 1000);

        } catch {
            setError("Server error");

            setAlert({
                show: true,
                message: "Server error",
                type: "error"
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <CustomAlert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() =>
                    setAlert(prev => ({
                        ...prev,
                        show: false
                    }))
                }
            />

            <form
                onSubmit={handleSubmit}
                className="space-y-4 w-96"
            >

                <input
                    value={roomName}
                    onChange={(e) =>
                        setRoomName(e.target.value)
                    }
                    className="w-full border p-2"
                />

                <input
                    type="number"
                    value={chairNumber}
                    onChange={(e) =>
                        setChairNumber(e.target.value)
                    }
                    className="w-full border p-2"
                />

                <select
                    value={departmentId}
                    onChange={(e) =>
                        setDepartmentId(e.target.value)
                    }
                    className="w-full border p-2"
                >
                    {departments.map(d => (
                        <option
                            key={d.department_id}
                            value={d.department_id}
                        >
                            {d.department_name}
                        </option>
                    ))}
                </select>

                <button className="bg-teal-600 text-white w-full p-2">
                    Save
                </button>

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

            </form>
        </div>
    );
}