import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this appointment?
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

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load appointments",
          type: "error",
        })
      );
  }, []);

  const deleteAppointment = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/appointments/${selectedId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        setAlert({
          show: true,
          message: "Delete failed",
          type: "error",
        });
        return;
      }

      setAppointments((prev) =>
        prev.filter((app) => app.appointment_id !== selectedId)
      );

      setAlert({
        show: true,
        message: "Appointment deleted successfully",
        type: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setConfirmOpen(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <Navbar />

      <div className="min-h-screen flex w-full mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
              Appointments
            </h1>

            <button
              onClick={() => navigate("/addApointment")}
              className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
            >
              + Book Appointment
            </button>
          </div>

          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert((p) => ({ ...p, show: false }))}
          />

          <ConfirmModal
            show={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deleteAppointment}
          />

          <table className="min-w-full text-left text-sm sm:text-base text-black">
            <thead>
              <tr className="border-b">
                <th className="py-3 pl-4">ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Treatment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((app) => (
                <tr key={app.appointment_id} className="border-b hover:bg-gray-50">
                  <td className="py-4 pl-4">{app.appointment_id}</td>

                  <td>
                    {app.Patient?.User?.first_name}{" "}
                    {app.Patient?.User?.last_name}
                  </td>

                  <td>
                    Dr. {app.Doctor?.User?.first_name}{" "}
                    {app.Doctor?.User?.last_name}
                  </td>

                  <td>
                    {new Date(app.appointment_date_time).toLocaleString()}
                  </td>

                  <td>{app.description}</td>
                  <td>{app.appointment_status}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedId(app.appointment_id);
                        setConfirmOpen(true);
                      }}
                      className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/appointments/edit/${app.appointment_id}`)
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
  );
}