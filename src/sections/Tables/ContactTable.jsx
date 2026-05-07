import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import TableCard from "./TableCard";

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/contacts/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setContacts(contacts.filter((c) => c.contact_id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                Contacts
              </h1>

              <button
                onClick={() => navigate("/add-contact")}
                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F]"
              >
                + Add Contact
              </button>
            </div>

            <table className="min-w-full text-left text-sm sm:text-base text-black">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pl-4">ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c.contact_id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pl-4">{c.contact_id}</td>
                    <td>{c.fullname}</td>
                    <td>{c.email}</td>
                    <td>{c.phone_number}</td>
                    <td className="max-w-xs truncate">{c.message}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/contacts/edit/${c.contact_id}`)
                        }
                        className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(c.contact_id)}
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Delete
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