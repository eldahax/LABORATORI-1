import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter(user => user.Id !== id));
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <h1 className="text-lg sm:text-xl font-bold text-[#0F766E] mb-6">
        Patients
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
            <tr key={user.Id} className="border-b hover:bg-gray-50">
              <td className="py-4 pl-4">{user.Id}</td>
              <td className="py-2">{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Email}</td>
              <td>{user.PhoneNumber}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => handleDelete(user.Id)}
                  className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
  
                <button
                  onClick={() => navigate(`/users/edit/${user.Id}`)}
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
  );
}