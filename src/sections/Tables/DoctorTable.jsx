import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar"
export default function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (doctor_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${doctor_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDoctors(doctors.filter((doc) => doc.doctor_id !== doctor_id));
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
          Doctors
        </h1>
        <button
          onClick={() => navigate("/add")} 
          className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
        >
          + Add Doctor
        </button>
      </div>
      <table className="min-w-full text-left text-sm sm:text-base text-black">
        <thead>
          <tr className="border-b">
            <th className="py-3 pl-4">ID</th>
            <th className="py-2">First Name</th>
            <th>Last Name</th>
            <th>Speciality</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.doctor_id} className="border-b hover:bg-gray-50">
              <td className="py-4 pl-4">{doc.doctor_id}</td>
              <td className="py-2">{doc.User?.first_name}</td>
              <td>{doc.User?.last_name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.years_experience} years</td>
              <td>{doc.User?.email}</td>
              <td>{doc.User?.phone_number}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => (doc.doctor_id)}
                  className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
  
                <button
                  onClick={() => navigate(`/doctors/edit/${doc.doctor_id}`)}
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