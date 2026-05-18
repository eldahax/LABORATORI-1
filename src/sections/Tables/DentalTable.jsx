import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function DentalTable() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (!window.confirm("Delete this dental record?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/dental-history/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }

      setRecords((prev) =>
        prev.filter(
          (r) =>
            (r.dental_record_id || r.id) !== id
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredRecords = records.filter((rec) => {
    const patient =
      `${rec.Patient?.User?.first_name || ""} ${
        rec.Patient?.User?.last_name || ""
      }`.toLowerCase();

    const doctor =
      `${rec.Doctor?.User?.first_name || ""} ${
        rec.Doctor?.User?.last_name || ""
      }`.toLowerCase();

    const tooth = (
      rec.tooth || ""
    ).toLowerCase();

    const condition = (
      rec.dental_condition || ""
    ).toLowerCase();

    const search =
      searchTerm.toLowerCase();

    return (
      patient.includes(search) ||
      doctor.includes(search) ||
      tooth.includes(search) ||
      condition.includes(search)
    );
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="flex w-full min-h-screen mt-[50px]">
        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">
          <TableCard />

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h1 className="text-2xl font-bold text-[#0F766E] mb-6">
              Dental Records
            </h1>

            <div className="w-1/2 max-w-sm mb-6">
              <input
                type="text"
                placeholder="Search patient, doctor..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecords.map((rec) => (
                <div
                  key={
                    rec.dental_record_id ||
                    rec.id
                  }
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <h2 className="font-bold">
                    Tooth: {rec.tooth}
                  </h2>

                  <p>
                    Condition:{" "}
                    {rec.dental_condition}
                  </p>

                  <p className="text-sm text-gray-500">
                    Patient:{" "}
                    {rec.Patient?.User
                      ?.first_name ||
                      "N/A"}{" "}
                    {
                      rec.Patient?.User
                        ?.last_name
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    Doctor:{" "}
                    {rec.Doctor?.User
                      ?.first_name ||
                      "N/A"}{" "}
                    {
                      rec.Doctor?.User
                        ?.last_name
                    }
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/dental-history/edit/${
                            rec.dental_record_id ||
                            rec.id
                          }`
                        )
                      }
                      className="border border-green-500 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          rec.dental_record_id ||
                            rec.id
                        )
                      }
                      className="border border-red-500 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filteredRecords.length ===
                0 && (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No matching dental records found.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}