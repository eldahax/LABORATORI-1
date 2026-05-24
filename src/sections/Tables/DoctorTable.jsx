import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

function ConfirmModal({ show, onConfirm, onCancel, loading }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this doctor?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed loading doctors",
          type: "error",
        })
      );
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    setDeleteLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/doctors/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Delete failed",
          type: "error",
        });
        setDeleteLoading(false);
        return;
      }

      setDoctors((prev) =>
        prev.filter((doc) => doc.doctor_id !== selectedId)
      );

      setAlert({
        show: true,
        message: "Doctor deleted successfully",
        type: "success",
      });

      setSelectedId(null);
      setConfirmOpen(false);
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setDeleteLoading(false);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const firstName = doc.User?.first_name?.toLowerCase() || "";
    const lastName = doc.User?.last_name?.toLowerCase() || "";
    const specialty = doc.specialization?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      firstName.includes(search) ||
      lastName.includes(search) ||
      specialty.includes(search)
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
      <Navbar />

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert({ show: false, message: "", type: "success" })
        }
      />

      <ConfirmModal
        show={confirmOpen}
        loading={deleteLoading}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleDelete}
      />

      <div className="min-h-screen flex w-full mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <TableCard />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
              Doctors
            </h1>

            <button
              onClick={() => navigate("/add")}
              className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
            >
              + Add Doctor
            </button>
          </div>

          <div className="w-1/3 mb-6">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"

            />
          </div>

          {filteredDoctors.length === 0 ? (
            <p className="text-gray-500 mt-10 text-center">
              No doctors found
            </p>
          ) : (
            <table className="min-w-full text-left text-sm sm:text-base text-black">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pl-4">ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Speciality</th>
                  <th>Experience</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr
                    key={doc.doctor_id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 pl-4">{doc.doctor_id}</td>
                    <td>{doc.User?.first_name}</td>
                    <td>{doc.User?.last_name}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.years_experience} years</td>
                    <td>{doc.User?.email}</td>
                    <td>{doc.User?.phone_number}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedId(doc.doctor_id);
                          setConfirmOpen(true);
                        }}
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/doctors/edit/${doc.doctor_id}`)
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
          )}
        </div>
      </div>
    </div>
  );
}