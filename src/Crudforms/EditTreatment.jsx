import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditTreatment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [treatmentName, setTreatmentName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [averageDuration, setAverageDuration] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const [nameErr, setNameErr] = useState("");
    const [priceErr, setPriceErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [durationErr, setDurationErr] = useState("");
    const [departmentErr, setDepartmentErr] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

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
                setTreatmentName(data.treatment_name || "");
                setPrice(data.price || "");
                setDescription(data.description || "");
                setAverageDuration(data.average_duration || "");
                setDepartmentName(data.Department?.department_name || "");
            })
            .catch(() => {
                setAlert({
                    show: true,
                    message: "Failed to load treatment",
                    type: "error",
                });
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameErr("");
        setPriceErr("");
        setDescriptionErr("");
        setDurationErr("");
        setDepartmentErr("");

        let hasError = false;

        if (treatmentName.trim() === "") {
            setNameErr("Treatment name is required");
            hasError = true;
        } else if (!nameRegex.test(treatmentName)) {
            setNameErr("Invalid treatment name");
            hasError = true;
        }

        if (price === "") {
            setPriceErr("Price is required");
            hasError = true;
        }

        if (description.trim() === "") {
            setDescriptionErr("Description is required");
            hasError = true;
        }

        if (averageDuration === "") {
            setDurationErr("Duration is required");
            hasError = true;
        }

        if (departmentName === "") {
            setDepartmentErr("Department is required");
            hasError = true;
        }

        if (hasError) return;

        try {
            const res = await fetch(`http://localhost:5000/api/treatments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    treatment_name: treatmentName,
                    price,
                    description,
                    average_duration: averageDuration,
                    department_name: departmentName
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setAlert({
                    show: true,
                    message: data.error || "Update failed",
                    type: "error",
                });
                return;
            }

            setAlert({
                show: true,
                message: "Treatment updated successfully!",
                type: "success",
            });

            setTimeout(() => {
                navigate("/Treatments");
            }, 1000);

        } catch {
            setAlert({
                show: true,
                message: "Server error",
                type: "error",
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">

            <div className="w-full max-w-md p-8 rounded-xl">

                {/* ALERT */}
                <CustomAlert
                    show={alert.show}
                    message={alert.message}
                    type={alert.type}
                    onClose={() =>
                        setAlert((p) => ({ ...p, show: false }))
                    }
                />

                <h1 className="text-[36px] font-bold text-[#0F766E] text-center mb-5">
                    EDIT TREATMENT
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        value={treatmentName}
                        onChange={(e) => setTreatmentName(e.target.value)}
                        placeholder="Treatment name"
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{nameErr}</p>

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{priceErr}</p>

                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{descriptionErr}</p>

                    <input
                        type="number"
                        value={averageDuration}
                        onChange={(e) => setAverageDuration(e.target.value)}
                        placeholder="Average duration"
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    />
                    <p className="text-red-500 text-sm">{durationErr}</p>

                    <select
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
                    >
                        <option value="">Select department</option>
                        {departments.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    <p className="text-red-500 text-sm">{departmentErr}</p>

                    <button
                        type="submit"
                        className="w-full bg-[#0F766E] text-white py-2 rounded-lg font-bold"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/Treatments")}
                        className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg mt-2"
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
}