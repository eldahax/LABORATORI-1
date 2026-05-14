import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (appointment_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${appointment_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments(appointments.filter((app) => app.appointment_id !== appointment_id));
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                Appointments
              </h1>
              <button
                onClick={() => navigate("/addApointment")}
                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
              >
                + Book Appointment
              </button>
            </div>

            <table className="min-w-full text-left text-sm sm:text-base text-black">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pl-4">ID</th>
                  <th className="py-2">Patient</th>
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
                    <td className="py-2">
                      {app.Patient?.User?.first_name} {app.Patient?.User?.last_name}
                    </td>
                    <td>
                      Dr. {app.Doctor?.User?.first_name} {app.Doctor?.User?.last_name}
                    </td>
                    <td>{new Date(app.appointment_date_time).toLocaleString()}</td>
                    <td>{app.description}</td>
                    <td>{app.appointment_status}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => handleDelete(app.appointment_id)}
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => navigate(`/appointments/edit/${app.appointment_id}`)}
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