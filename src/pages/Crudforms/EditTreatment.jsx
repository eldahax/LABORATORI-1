import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTreatment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        treatment_name: "",
        price: "",
        description: "",
        average_duration: "",
        department_name: "",
    });

    const [nameErr, setNameErr] = useState("");
    const [priceErr, setPriceErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [durationErr, setDurationErr] = useState("");
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
        fetch(`http://localhost:5000/api/treatments/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setForm({
                    treatment_name: data.treatment_name,
                    price: data.price,
                    description: data.description,
                    average_duration: data.average_duration,
                    department_name: data.Department?.department_name || "",
                });
            })
            .catch(() => { });
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameErr("");
        setPriceErr("");
        setDescriptionErr("");
        setDurationErr("");
        setDepartmentErr("");

        let hasError = false;

        if (!form.treatment_name.trim()) {
            setNameErr("Treatment name is required");
            hasError = true;
        } else if (!nameRegex.test(form.treatment_name)) {
            setNameErr("Invalid treatment name");
            hasError = true;
        }

        if (!form.price) {
            setPriceErr("Price is required");
            hasError = true;
        }

        if (!form.description.trim()) {
            setDescriptionErr("Description is required");
            hasError = true;
        }

        if (!form.average_duration) {
            setDurationErr("Duration is required");
            hasError = true;
        }

        if (!form.department_name) {
            setDepartmentErr("Department is required");
            hasError = true;
        }

        if (hasError) return;

        await fetch(`http://localhost:5000/api/treatments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        navigate("/treatments");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-[450px] bg-white p-8 rounded-2xl shadow-lg space-y-4"
            >
                <h1 className="text-3xl font-bold text-[#134E4A] text-center">
                    Edit Treatment
                </h1>

                <div>
                    <input
                        name="treatment_name"
                        value={form.treatment_name}
                        onChange={handleChange}
                        placeholder="Treatment Name"
                        className="p-3 border w-full rounded-lg"
                    />
                    <p className="text-red-500 text-sm">{nameErr}</p>
                </div>

                <div>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="p-3 border w-full rounded-lg"
                    />
                    <p className="text-red-500 text-sm">{priceErr}</p>
                </div>

                <div>
                    <input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-3 border w-full rounded-lg"
                    />
                    <p className="text-red-500 text-sm">{descriptionErr}</p>
                </div>

                <div>
                    <input
                        type="number"
                        name="average_duration"
                        value={form.average_duration}
                        onChange={handleChange}
                        placeholder="Average Duration"
                        className="p-3 border w-full rounded-lg"
                    />
                    <p className="text-red-500 text-sm">{durationErr}</p>
                </div>

                <div>
                    <select
                        name="department_name"
                        value={form.department_name}
                        onChange={handleChange}
                        className="p-3 border w-full rounded-lg"
                    >
                        <option value="">Select Department</option>
                        {departments.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    <p className="text-red-500 text-sm">{departmentErr}</p>
                </div>

                <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
                    Update Treatment
                </button>
            </form>
        </div>
    );
}