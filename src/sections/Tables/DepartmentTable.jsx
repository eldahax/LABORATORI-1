import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function DepartmentsTable() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/departments")
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (department_id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/departments/${department_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setDepartments(
          departments.filter(dep => dep.department_id !== department_id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl mb-8 overflow-x-auto">
      <Navbar />

      <div className="min-h-screen">
        <div className="flex w-full min-h-screen mt-[50px]">
          <Sidebar />

          <div className="w-3/4 p-10 ml-[25%]">
            <TableCard />

               <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
 DEPARTMENT'S
        </h1>
        <button
          onClick={() => navigate("/dep")} 
          className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
        >
          + Add Department
        </button>
      </div>
      

              <table className="min-w-full text-left text-sm sm:text-base text-black">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pl-4">ID</th>
                    <th className="py-2">Department Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {departments.map((dep) => (
                    <tr
                      key={dep.department_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 pl-4">{dep.department_id}</td>
                      <td className="py-2">{dep.department_name}</td>

                      <td className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDelete(dep.department_id)
                          }
                          className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/departments/edit/${dep.department_id}`)
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