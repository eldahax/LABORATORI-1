import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar"



export default function TablePatient() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/patients")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = async (patient_id) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/patients/${patient_id}`, {
                method: "DELETE",
            }
            );

            if (res.ok) {
                setUsers((prev) =>
                    prev.filter((user) => user.patient_id !== patient_id)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
                   <Navbar></Navbar>
            <div className=' min-h-screen'>

                <div className="flex w-full min-h-screen mt-[50px]">

                    <Sidebar />

                    <div className="w-3/4  p-10  ml-[25%]">


                        <TableCard></TableCard>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                    Patients
                </h1>
                <button
                    onClick={() => navigate("/addP")}
                    className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
                >
                    + Add Patient
                </button>
            </div>

            <table className="min-w-full text-left text-sm sm:text-base text-black">
                <thead>
                    <tr className="border-b">
                        <th className="py-3 pl-4">ID</th>
                        <th className="py-2">First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Allergy</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.patient_id} className="border-b hover:bg-gray-50">
                            <td className="py-4 pl-4">{user.patient_id}</td>


                            <td>{user.User?.first_name}</td>
                            <td>{user.User?.last_name}</td>
                            <td>{user.User?.email}</td>
                            <td>{user.User?.phone_number}</td>

                            <td>
                                {user.PatientAllergies?.length > 0
                                    ? user.PatientAllergies.map((a) => a.allergy_name).join(", ")
                                    : "No allergy"}
                            </td>

                            <td className="flex gap-2 py-2">
                                <button
                                    onClick={() => handleDelete(user.patient_id)}
                                    className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(`/patients/edit/${user.patient_id}`)
                                    }
                                    className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            
                    </div>
                </div>

            </div>
    );
}