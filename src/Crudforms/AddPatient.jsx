import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddPatient() {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [allergy, setAllergy] = useState("");

    const [error, setError] = useState("");

    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{6,15}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nameRegex.test(name)) {
            setError("Invalid first name");
            return;
        }

        if (!nameRegex.test(lastname)) {
            setError("Invalid last name");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Invalid email");
            return;
        }

        if (!phoneRegex.test(phone)) {
            setError("Invalid phone number");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (!dateOfBirth) {
            setError("Date of birth is required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/patients/add", {
                method: "POST",
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
                    allergy_name: allergy || null
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setDateOfBirth("");
            setAllergy("");

        } catch (err) {
            console.log(err);
            setError("Server error");
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="w-full max-w-md p-8 rounded-xl">

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

                    <input placeholder="allergy"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                        className="w-full border p-2 rounded" />

                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#0F766E] text-white py-2 rounded hover:bg-[#134E4A]"
                    >
                        Create Patient
                    </button>

                </form>
            </div>
        </div>
    );
}