import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function AddPatient() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        date_of_birth: "",
        allergy_name: "",
    });

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{6,15}$/;

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameRegex.test(form.first_name)) {
            return setAlert({
                show: true,
                message: "Invalid first name",
                type: "error",
            });
        }

        if (!nameRegex.test(form.last_name)) {
            return setAlert({
                show: true,
                message: "Invalid last name",
                type: "error",
            });
        }

        if (!emailRegex.test(form.email)) {
            return setAlert({
                show: true,
                message: "Invalid email",
                type: "error",
            });
        }

        if (!phoneRegex.test(form.phone_number)) {
            return setAlert({
                show: true,
                message: "Invalid phone number",
                type: "error",
            });
        }

        if (form.password.length < 6) {
            return setAlert({
                show: true,
                message: "Password must be at least 6 characters",
                type: "error",
            });
        }

        if (!form.date_of_birth) {
            return setAlert({
                show: true,
                message: "Date of birth is required",
                type: "error",
            });
        }

        try {
            const res = await fetch(
                "http://localhost:5000/api/patients/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                return setAlert({
                    show: true,
                    message: data.error || "Something went wrong",
                    type: "error",
                });
            }

            setAlert({
                show: true,
                message: "Patient created successfully",
                type: "success",
            });

            setForm({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                phone_number: "",
                date_of_birth: "",
                allergy_name: "",
            });

            setTimeout(() => {
                navigate("/patients");
            }, 1200);
        } catch (err) {
            setAlert({
                show: true,
                message: "Server error",
                type: "error",
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen">

            <CustomAlert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() =>
                    setAlert({ show: false, message: "", type: "success" })
                }
            />

            <div className="w-full max-w-md p-8 rounded-xl">
                <h1 className="text-[30px] font-bold text-[#0F766E] text-center mb-5">
                    ADD PATIENT
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="first_name"
                        placeholder="First name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="last_name"
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="phone_number"
                        placeholder="Phone number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="allergy_name"
                        placeholder="Allergy"
                        value={form.allergy_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

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