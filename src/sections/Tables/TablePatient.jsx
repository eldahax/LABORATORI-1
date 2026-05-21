import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import TableCard from "./TableCard";

export default function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (patient_id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/patients/${patient_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setPatients(
          patients.filter(
            (patient) => patient.patient_id !== patient_id
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const firstName =
      patient.User?.first_name?.toLowerCase() || "";

    const lastName =
      patient.User?.last_name?.toLowerCase() || "";

    const allergy =
      patient.PatientAllergies?.[0]?.allergy_name?.toLowerCase() ||
      "";

    const lowerSearch = searchTerm.toLowerCase();

    return (
      firstName.includes(lowerSearch) ||
      lastName.includes(lowerSearch) ||
      allergy.includes(lowerSearch)
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <Navbar />

      <div className="min-h-screen">
        <div className="flex w-full min-h-screen mt-[50px]">
          <Sidebar />

          <div className="w-3/4 p-10 ml-[25%]">
            <TableCard />

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                Patients
              </h1>

              <button
                onClick={() => navigate("/patients/add")}
                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
              >
                + Add Patient
              </button>
            </div>

            <div className="w-1/3 mx-4 mb-6">
              <input
                type="text"
                placeholder="Search patient name or allergy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <table className="min-w-full text-left text-sm sm:text-base text-black">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pl-4">ID</th>
                  <th className="py-2">First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Allergy</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.patient_id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 pl-4">
                      {patient.patient_id}
                    </td>

                    <td className="py-2">
                      {patient.User?.first_name}
                    </td>

                    <td>
                      {patient.User?.last_name}
                    </td>

                    <td>
                      {patient.date_of_birth}
                    </td>

                    <td>
                      {patient.PatientAllergies?.[0]?.allergy_name}
                    </td>

                    <td>
                      {patient.User?.email}
                    </td>

                    <td>
                      {patient.User?.phone_number}
                    </td>

                    <td className="flex gap-2">
                      <button
                        onClick={() =>
                          handleDelete(patient.patient_id)
                        }
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/patients/edit/${patient.patient_id}`
                          )
                        }
                        className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredPatients.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-8 text-gray-500"
                    >
                      No matching patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}