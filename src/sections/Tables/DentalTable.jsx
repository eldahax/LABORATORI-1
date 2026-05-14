import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function DentalTable() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/dental-history")
      .then((res) => res.json())
      .then((data) => {
        setRecords(Array.isArray(data) ? data : data?.data || []);
      })
      .catch(console.log);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dental record?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/dental-history/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }

      setRecords((prev) =>
        prev.filter((r) => r.dental_record_id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="flex w-full min-h-screen mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <TableCard />

          <h1 className="text-2xl font-bold text-[#0F766E] mb-6">
            Dental Records
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((rec) => (
              <div
                key={rec.dental_record_id || rec.id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h2 className="font-bold">
                  Tooth: {rec.tooth}
                </h2>

                <p>Condition: {rec.dental_condition}</p>

                <p className="text-sm text-gray-500">
                  Patient: {rec.Patient?.User?.first_name}{" "}
                  {rec.Patient?.User?.last_name}
                </p>

                <p className="text-sm text-gray-500">
                  Doctor: {rec.Doctor?.User?.first_name}{" "}
                  {rec.Doctor?.User?.last_name}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/dental-history/edit/${rec.dental_record_id || rec.id}`)
                    }
                    className="border border-green-500 px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(rec.dental_record_id || rec.id)}
                    className="border border-red-500 px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}