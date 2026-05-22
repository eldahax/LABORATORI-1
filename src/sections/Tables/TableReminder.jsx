import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function TableReminder() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/reminders")
      .then((res) => res.json())
      .then((data) => {
        setReminders(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reminder?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/reminders/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setReminders(
          reminders.filter((r) => r.reminder_id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAsSent = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reminders/${id}/sent`,
        { method: "PATCH" }
      );

      if (res.ok) {
        setReminders(
          reminders.map((r) =>
            r.reminder_id === id
              ? {
                reminder_id: r.reminder_id,
                appointment_id: r.appointment_id,
                message: r.message,
                reminder_date: r.reminder_date,
                sent: true,
                Appointment: r.Appointment
              }
              : r
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPatientName = (r) => {
    const u = r?.Appointment?.Patient?.User;
    if (!u) return "Unknown";

    return `${u.first_name || ""} ${u.last_name || ""}`;
  };

  const getDoctorName = (r) => {
    const u = r?.Appointment?.Doctor?.User;
    if (!u) return "Unknown";

    return `Dr. ${u.first_name || ""} ${u.last_name || ""}`;
  };

  const formatDate = (d) => {
    const date = new Date(d);
    if (isNaN(date.getTime())) return "Invalid";
    return date.toLocaleString();
  };

  const getStatus = (r) => {
    if (r.sent) return "sent";

    const now = new Date();
    const rd = new Date(r.reminder_date);

    if (isNaN(rd.getTime())) return "invalid";
    if (rd < now) return "overdue";

    const diffH = (rd - now) / (1000 * 60 * 60);

    if (diffH <= 24) return "due soon";

    return "pending";
  };

  const q = search.toLowerCase();

  const filtered = reminders.filter((r) => {
    const text =
      (
        getPatientName(r) +
        " " +
        getDoctorName(r) +
        " " +
        (r.message || "")
      ).toLowerCase();

    return (
      text.includes(q) &&
      (statusFilter === "all" ||
        getStatus(r) === statusFilter)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#0F766E]">
        Loading reminders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <aside className="fixed top-0 left-0 h-screen w-1/4 z-50 bg-white border-r">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0 md:ml-[25%]">
        <Navbar />

        <main className="w-full pt-[90px] px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0F766E]">
              Reminder Management
            </h1>
            <p className="text-gray-500">Manage all reminders</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-3">
            <input
              className="flex-1 border p-3 rounded-lg"
              placeholder="Search patient, doctor or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-3 rounded-lg md:w-60"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="due soon">Due Soon</option>
              <option value="overdue">Overdue</option>
              <option value="sent">Sent</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((r) => {
              const status = getStatus(r);

              return (
                <div
                  key={r.reminder_id}
                  className="bg-white rounded-xl shadow p-5"
                >
                  <div className="flex justify-between mb-4">
                    <h2 className="font-bold text-[#0F766E]">
                      Reminder #{r.reminder_id}
                    </h2>

                    <span className="text-xs px-3 py-1 rounded-full">
                      {status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <b>Patient:</b> {getPatientName(r)}
                    </p>
                    <p>
                      <b>Doctor:</b> {getDoctorName(r)}
                    </p>
                    <p>
                      <b>Appointment:</b>{" "}
                      {formatDate(
                        r?.Appointment?.appointment_date_time
                      )}
                    </p>
                    <p>
                      <b>Reminder:</b>{" "}
                      {formatDate(r.reminder_date)}
                    </p>
                    <p>
                      <b>Message:</b> {r.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button
                      onClick={() =>
                        navigate(
                          `/reminders/edit/${r.reminder_id}`
                        )
                      }
                      className="border border-[#0F766E] text-[#0F766E] py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    {!r.sent && (
                      <button
                        onClick={() =>
                          handleMarkAsSent(r.reminder_id)
                        }
                        className="border border-blue-500 text-blue-500 py-2 rounded-lg"
                      >
                        Sent
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(r.reminder_id)
                      }
                      className="col-span-2 border border-red-500 text-red-500 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}