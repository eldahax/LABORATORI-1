import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTreatment() {

    const navigate = useNavigate();

    const [treatmentName, setTreatmentName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [averageDuration, setAverageDuration] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const [signupErr, setSignupErr] = useState("");

    const [nameErr, setNameErr] = useState("");
    const [priceErr, setPriceErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [durationErr, setDurationErr] = useState("");
    const [departmentErr, setDepartmentErr] = useState("");

    const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

   const [deps,setDeps]=useState([]);

   useEffect(()=>{
    const fetchD=async()=>{
        const d=await fetch("http://localhost:5000/api/departments");
        const res=await d.json();
        setDeps(res);
    }
    fetchD();
   },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameErr("");
        setPriceErr("");
        setDescriptionErr("");
        setDurationErr("");
        setDepartmentErr("");
        setSignupErr("");

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
            const res = await fetch("http://localhost:5000/api/treatments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    treatment_name: treatmentName,
                    price: price,
                    description: description,
                    average_duration: averageDuration,
                    department_name: departmentName
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setSignupErr(data.error);
                return;
            }

            alert("Treatment created successfully!");
            navigate("/Treatments");

            setTreatmentName("");
            setPrice("");
            setDescription("");
            setAverageDuration("");
            setDepartmentName("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-md p-8 rounded-xl">

                <h1 className="text-[36px] font-bold text-[#0F766E] text-center tracking-widest mb-5">
                    ADD TREATMENT
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col pt-4">
                        <input
                            type="text"
                            placeholder="treatment name"
                            value={treatmentName}
                            onChange={(e) => setTreatmentName(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
                        />
                        <p className="text-red-500 pl-[4px] font-sm">{nameErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="number"
                            placeholder="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
                        />
                        <p className="text-red-500 pl-[4px] font-sm">{priceErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
                        />
                        <p className="text-red-500 pl-[4px] font-sm">{descriptionErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="number"
                            placeholder="average duration"
                            value={averageDuration}
                            onChange={(e) => setAverageDuration(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
                        />
                        <p className="text-red-500 pl-[4px] font-sm">{durationErr}</p>
                    </div>

                    <div className="flex flex-col">
                        <select
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
                        >
                            <option value="">select department</option>

                            {deps.map((d) => (
                                <option key={d.department_id} value={d.department_name}>
                                    {d.department_name}
                                </option>
                            ))}
                        </select>
                        <p className="text-red-500 pl-[4px] font-sm">{departmentErr}</p>
                    </div>

                    {signupErr && (
                        <p className="text-red-500 text-center font-semibold">
                            {signupErr}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#0F766E] text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-[#134E4A] transition-colors"
                    >
                        Add Treatment
                    </button>

                </form>
            </div>
        </div>
    );
}