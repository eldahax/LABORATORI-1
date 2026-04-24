import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddPatient() {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [allergy, setAllergy] = useState("");

    const [error, setError] = useState("");

    const nameRegex = /^[A-Za-z]{3,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        let hasError = false;

        if (!nameRegex.test(name)) hasError = true;
        if (!nameRegex.test(lastname)) hasError = true;
        if (!emailRegex.test(email)) hasError = true;
        if (password.length < 6) hasError = true;
        if (!dateOfBirth) hasError = true;

        if (hasError) {
            setError("Please fill all fields correctly");
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
                    email: email,
                    phone_number: phone,
                    password: password,
                    date_of_birth: dateOfBirth,
                    allergy_name: allergy
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            alert("Patient created successfully!");

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

                    <input
                        placeholder="First name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Last name"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        placeholder=" allergys"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

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