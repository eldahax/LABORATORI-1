import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import EditDentalModal from "../../Crudforms/EditDentalRecord"; 

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this dental record?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg">
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

export default function DentalTable() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
 
  const [editOpen, setEditOpen] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  
  const fetchDentalRecords = () => {
    fetch("http://localhost:5000/api/dental-history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const recordsData = Array.isArray(data) ? data : data?.data || [];
        setRecords(recordsData);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          show: true,
          message: "Failed to load dental records",
          type: "error",
        });
      });
  };

  useEffect(() => {
    fetchDentalRecords();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/dental-history/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Delete failed",
          type: "error",
        });
        return;
      }

      setRecords((prev) =>
        prev.filter((r) => (r.dental_record_id || r.id) !== selectedId)
      );

      setAlert({
        show: true,
        message: "Dental record deleted successfully",
        type: "success",
      });
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setConfirmOpen(false);
  };

  const filteredRecords = records.filter((rec) => {
    const patient = `${rec.Patient?.User?.first_name || ""} ${rec.Patient?.User?.last_name || ""}`.toLowerCase();
    const doctor = `${rec.Doctor?.User?.first_name || ""} ${rec.Doctor?.User?.last_name || ""}`.toLowerCase();
    const tooth = (rec.tooth || "").toLowerCase();
    const condition = (rec.dental_condition || "").toLowerCase();
    const search = searchTerm.toLowerCase();

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

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <ConfirmModal
        show={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      <EditDentalModal
        show={editOpen}
        recordId={editRecordId}
        onClose={() => {
          setEditOpen(false);
          setEditRecordId(null);
        }}
        onSuccess={() => {
          fetchDentalRecords(); 
          setAlert({
            show: true,
            message: "Dental record updated successfully",
            type: "success",
          });
        }}
      />

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecords.map((rec) => {
                const currentId = rec.dental_record_id || rec.id;
                return (
                  <div key={currentId} className="bg-white p-5 rounded-xl shadow border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold text-gray-800 text-lg mb-1">
                        Tooth: {rec.tooth}
                      </h2>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-semibold text-gray-700">Condition:</span> {rec.dental_condition}
                      </p>
                      <hr className="border-gray-100 my-2" />
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">Patient:</span>{" "}
                        {rec.Patient?.User?.first_name} {rec.Patient?.User?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <span className="font-medium text-gray-700">Doctor:</span>{" "}
                        {rec.Doctor?.User?.first_name} {rec.Doctor?.User?.last_name}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-5 pt-3 border-t border-gray-50">
                      <button
                        onClick={() => {
                          setEditRecordId(currentId);
                          setEditOpen(true); 
                        }}
                        className="text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(currentId);
                          setConfirmOpen(true);
                        }}
                        className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredRecords.length === 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500 font-medium">
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