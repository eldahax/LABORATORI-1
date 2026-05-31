import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddPatient({ show, onClose }) {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [allergy, setAllergy] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "error",
    });

    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameRegex.test(name)) {
            setAlert({ show: true, message: "Invalid first name", type: "error" });
            return;
        }

        if (!nameRegex.test(lastname)) {
            setAlert({ show: true, message: "Invalid last name", type: "error" });
            return;
        }

        if (!emailRegex.test(email)) {
            setAlert({ show: true, message: "Invalid email", type: "error" });
            return;
        }

        if (!phoneRegex.test(phone)) {
            setAlert({ show: true, message: "Invalid phone number", type: "error" });
            return;
        }

        if (password.length < 6) {
            setAlert({ show: true, message: "Password must be at least 6 characters", type: "error" });
            return;
        }

        if (!dateOfBirth) {
            setAlert({ show: true, message: "Date of birth is required", type: "error" });
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/patients/add", {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: name,
                    last_name: lastname,
                    email,
                    phone_number: phone,
                    password,
                    date_of_birth: dateOfBirth,
                    allergy_name: allergy.trim() ? [allergy.trim()] : []
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setAlert({ show: true, message: data.error || "Something went wrong", type: "error" });
                return;
            }

            setName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setDateOfBirth("");
            setAllergy("");

            onClose();

        } catch (err) {
            console.log(err);
            setAlert({ show: true, message: "Server error", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    ✕
                </button>

                <h1 className="text-[30px] font-bold text-[#0F766E] text-center mb-5">
                    ADD PATIENT
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="First name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input placeholder="Last name" value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input placeholder="Phone number" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input type="date" value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full border p-2 rounded" />

                    <input
                        placeholder="allergy"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-[#0F766E] text-white py-2 rounded hover:bg-[#134E4A]"
                        >
                            Create Patient
                        </button>
                    </div>
                </form>
            </div>

            <CustomAlert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: "", type: "error" })}
            />
        </div>
    );
}