import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import BookingModal from "../../Crudforms/AddApointment";
import EditAppointmentModal from "../../Crudforms/EditAppointment";
import TableCard from "./TableCard";
import API from "../../components/costumFetch";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg text-black">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this appointment?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-gray-600">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  const [editAppointmentOpen, setEditAppointmentOpen] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState(null);

  const roles = user?.Roles || user?.roles || [];

  const fetchAppointments = () => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

    fetchAppointments();
  }, []);

  const deleteAppointment = async () => {
    try {
      const res = await API.delete(`/appointments/${selectedId}`);
      if (res.status === 200) {
        setAppointments((prev) => prev.filter((app) => app.appointment_id !== selectedId));
        setAlert({ show: true, message: "Appointment deleted successfully", type: "success" });
      }
    } catch (err) {
      setAlert({ 
        show: true, 
        message: err.response?.data?.error || "Delete operation failed", 
        type: "error" 
      });
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const handleBookingSuccess = () => {
    fetchAppointments();
    setAlert({
      show: true,
      message: "Appointment Booked and Paid Successfully!",
      type: "success"
    });
  };

  const filteredAppointments = appointments.filter((app) => {
    const doctor = `${app.Doctor?.User?.first_name || ""} ${app.Doctor?.User?.last_name || ""}`.toLowerCase();
    const patient = `${app.Patient?.User?.first_name || ""} ${app.Patient?.User?.last_name || ""}`.toLowerCase();

    return (
      doctor.includes(search.toLowerCase()) ||
      patient.includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl mb-8 overflow-x-auto text-black">
      <Navbar />

      <div className="min-h-screen flex w-full mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <TableCard />
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
              Appointments
            </h1>

            {(roles.includes("admin") || roles.includes("receptionist")) && (
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0d635c] transition cursor-pointer"
              >
                + Book Appointment
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Search by doctor or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-[30%] mb-4"
          />

          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert((p) => ({ ...p, show: false }))}
          />

          <ConfirmModal
            show={confirmOpen}
            onCancel={() => { setConfirmOpen(false); setSelectedId(null); }}
            onConfirm={deleteAppointment}
          />

          <BookingModal
            show={bookingOpen}
            onClose={() => setBookingOpen(false)}
            onPaymentSuccess={handleBookingSuccess}
          />

          <EditAppointmentModal
            show={editAppointmentOpen}
            appointmentId={editAppointmentId}
            roles={roles}
            onClose={() => {
              setEditAppointmentOpen(false);
              setEditAppointmentId(null);
            }}
            onSuccess={() => {
              setAlert({
                show: true,
                message: "Appointment updated successfully",
                type: "success",
              });
              fetchAppointments();
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAppointments.map((app) => (
              <div
                key={app.appointment_id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#0F766E]">
                      Appointment with Dr. {app.Doctor?.User?.first_name} {app.Doctor?.User?.last_name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(app.appointment_date_time).toLocaleString()}
                    </p>
                  </div>
                  <span className="bg-[#0F766E]/10 text-[#0F766E] text-xs px-3 py-1 rounded-full">
                    {app.appointment_status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Patient:</span> {app.Patient?.User?.first_name} {app.Patient?.User?.last_name}</p>
                  <p><span className="font-semibold">Doctor:</span> Dr. {app.Doctor?.User?.first_name} {app.Doctor?.User?.last_name}</p>
                  <p><span className="font-semibold">Room:</span> {app.Room?.room_name}</p>
                  <p><span className="font-semibold">Duration:</span> {app.duration} mins</p>
                  <p><span className="font-semibold">Procedure:</span> {app.PatientTreatments?.[0]?.Treatment?.treatment_name}</p>
                  <p><span className="font-semibold">Condition:</span> {app.DentalRecords?.[0]?.dental_condition}</p>
                  <p><span className="font-semibold">Tooth:</span> {app.DentalRecords?.[0]?.tooth}</p>
                </div>

                <div className="flex gap-3 mt-5">
                  {roles.includes("admin") && (
                    <button
                      onClick={() => {
                        setSelectedId(app.appointment_id);
                        setConfirmOpen(true);
                      }}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition py-2 rounded-xl cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                
                  {(roles.includes("admin")  || roles.includes("doctor")) && (
                    <button
                      onClick={() => {
                        setEditAppointmentId(app.appointment_id);
                        setEditAppointmentOpen(true);
                      }}
                      className="flex-1 text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg transition cursor-pointer"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredAppointments.length === 0 && (
              <p className="text-gray-500 col-span-2 text-center py-8">No appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}