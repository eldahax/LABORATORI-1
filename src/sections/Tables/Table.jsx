import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar"
export default function Table() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (user_id) => {
  try {
    const res=await fetch(`http://localhost:5000/api/users/${user_id}`, {
      method: "DELETE",
    });
if (res.ok) {
      setUsers(users.filter((user) => user.user_id !== user_id));
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
      <div className="bg-white p-4 sm:p-6 rounded-xl  mb-8 overflow-x-auto">
                   <Navbar></Navbar>
            <div className=' min-h-screen'>

                <div className="flex w-full min-h-screen mt-[50px]">

                    <Sidebar />

                    <div className="w-3/4  p-10  ml-[25%]">


                        <TableCard></TableCard>
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <h1 className="text-lg sm:text-xl font-bold text-[#0F766E] mb-6">
        USERS
      </h1>

      <table className="min-w-full text-left text-sm sm:text-base text-black">
        <thead>
          <tr className="border-b">
            <th className="py-3 pl-4">ID</th>
            <th className="py-2">First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-b hover:bg-gray-50">
              <td className="py-4 pl-4">{user.user_id}</td>
              <td className="py-2">{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
  
                <button
                  onClick={() => navigate(`/users/edit/${user.user_id}`)}
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
    </div></div>
  );
}