import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import AddPatient from "../../Crudforms/AddPatient";
import EditPatient from "../../Crudforms/EditPatient";
import API from "../../components/costumFetch";

function ConfirmDeleteModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this patient?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TablePatient() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const[user,setUser]=useState(null);
  const roles=user?.roles || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const fetchPatients = () => {
    fetch("http://localhost:5000/api/patients", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load patients",
          type: "error",
        })
      );
  };

  useEffect(() => {
      fetch("http://localhost:5000/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
   
  
  
    fetchPatients();
  }, []);

  const openDelete = (id) => {
    setSelectedPatientId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/patients/${selectedPatientId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setAlert({
          show: true,
          message: "Delete failed",
          type: "error",
        });
        return;
      }

      fetchPatients();

      setAlert({
        show: true,
        message: "Patient deleted successfully",
        type: "success",
      });

      setShowDeleteModal(false);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  const openEdit = (id) => {
    setSelectedPatientId(id);
    setShowEditModal(true);
  };

  const filteredUsers = users.filter((user) => {
    const firstName = user.User?.first_name?.toLowerCase() || "";
    const lastName = user.User?.last_name?.toLowerCase() || "";
    const email = user.User?.email?.toLowerCase() || "";
    const phone = user.User?.phone_number?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      firstName.includes(search) ||
      lastName.includes(search) ||
      email.includes(search) ||
      phone.includes(search)
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <Navbar />

      <div className="min-h-screen flex w-full mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() =>
              setAlert((p) => ({
                ...p,
                show: false,
              }))
            }
          />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
              Patients
            </h1>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F]"
            >
              + Add Patient
            </button>
          </div>

          <div className="w-1/3 mb-6">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
            />
          </div>

          <table className="min-w-full text-left text-sm sm:text-base text-black">
            <thead>
              <tr className="border-b">
                <th className="py-3 pl-4">ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Allergy</th>
                {(roles.includes("admin")) &&(
                <th>Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.patient_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 pl-4">
                    {user.patient_id}
                  </td>

                  <td>
                    {user.User?.first_name}
                  </td>

                  <td>
                    {user.User?.last_name}
                  </td>

                  <td>
                    {user.User?.email}
                  </td>

                  <td>
                    {user.User?.phone_number}
                  </td>

                  <td>
                    {user.PatientAllergies?.length ? user.PatientAllergies.map(
                      (a) => a?.allergy_name).filter(Boolean).join(", ") : "No allergy"}
                  </td>

                  <td className="py-4">
                     {(roles.includes("admin")) &&(
                    <div className="flex gap-2">
                      
                      <button
                        onClick={() =>
                          openDelete(
                            user.patient_id
                          )
                        }
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          openEdit(
                            user.patient_id
                          )
                        }
                        className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Update
                      </button>
                    </div>
                     )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddPatient
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          fetchPatients();
        }}
      />

      <EditPatient
        show={showEditModal}
        patientId={selectedPatientId}
        onClose={() => {
          setShowEditModal(false);
          fetchPatients();
        }}
      />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() =>
          setShowDeleteModal(false)
        }
      />
    </div>
  );
}