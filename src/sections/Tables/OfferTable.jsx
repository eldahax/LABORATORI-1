import { useEffect, useState } from "react";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import EditTreatment from "../../Crudforms/EditTreatment";
import AddTreatment from "../../Crudforms/AddTreatment";
import EditOffer from "../../Crudforms/EditOffers";
import AddOffers from "../../Crudforms/AddOffers";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[110]">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item?
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

export default function OfferTable() {
  const [treatments, setTreatments] = useState([]);
  const [offers, setOffers] = useState([]);
    const[user,setUser]=useState(null);
   const roles = user?.roles || [];

  const [offerSearch, setOfferSearch] = useState("");
  const [treatmentSearch, setTreatmentSearch] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const [showAddTreatment, setShowAddTreatment] = useState(false);
  const [showEditTreatment, setShowEditTreatment] = useState(false);
  const [editTreatmentId, setEditTreatmentId] = useState(null);

  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showEditOffer, setShowEditOffer] = useState(false);
  const [editOfferId, setEditOfferId] = useState(null);

  const fetchTreatments = () => {
    fetch("http://localhost:5000/api/treatments", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Treatments fetched:", data);
        setTreatments(data);
      })
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load treatments",
          type: "error",
        })
      );
  };

  const fetchOffers = () => {
    fetch("http://localhost:5000/api/offers", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Offers fetched:", data);
        setOffers(data);
      })
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load offers",
          type: "error",
        })
      );
  };

  useEffect(() => {
      fetch("http://localhost:5000/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
   
  

    fetchTreatments();
    fetchOffers();
  }, []);

  const handleDeleteTreatment = async (treatment_id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/treatments/${treatment_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        await fetchTreatments();
        setAlert({
          show: true,
          message: "Treatment deleted successfully",
          type: "success",
        });
      } else {
        setAlert({
          show: true,
          message: "Failed to delete treatment",
          type: "error",
        });
      }
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  const handleDeleteOffer = async (offer_id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/offers/${offer_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        await fetchOffers();
        setAlert({
          show: true,
          message: "Offer deleted successfully",
          type: "success",
        });
      } else {
        setAlert({
          show: true,
          message: "Failed to delete offer",
          type: "error",
        });
      }
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  const handleCloseAddOffer = () => {
    setShowAddOffer(false);
    fetchOffers();
  };

  const handleCloseEditOffer = () => {
    setShowEditOffer(false);
    fetchOffers();
  };

  const handleCloseAddTreatment = () => {
    setShowAddTreatment(false);
    fetchTreatments();
  };

  const handleCloseEditTreatment = () => {
    setShowEditTreatment(false);
    fetchTreatments();
  };

  const filteredOffers = offers.filter((off) => {
    const name = (off.offers_name || "").toLowerCase();
    const treatmentsText = (off.Treatments?.map((t) => t.treatment_name).join(" ") || "").toLowerCase();
    const search = offerSearch.toLowerCase();
    return name.includes(search) || treatmentsText.includes(search);
  });

  const filteredTreatments = treatments.filter((t) => {
    const name = (t.treatment_name || "").toLowerCase();
    const department = (t.Department?.department_name || "").toLowerCase();
    const search = treatmentSearch.toLowerCase();
    return name.includes(search) || department.includes(search);
  });

  return (
    <>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
        <Navbar />

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

        <ConfirmModal
          show={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            if (deleteType === "offer") {
              handleDeleteOffer(selectedId);
            } else {
              handleDeleteTreatment(selectedId);
            }
            setConfirmOpen(false);
          }}
        />

        <AddOffers
          show={showAddOffer}
          onClose={handleCloseAddOffer}
        />

        <EditOffer
          show={showEditOffer}
          offerId={editOfferId}
          onClose={handleCloseEditOffer}
        />

        <AddTreatment
          show={showAddTreatment}
          onClose={handleCloseAddTreatment}
        />

        <EditTreatment
          show={showEditTreatment}
          treatmentId={editTreatmentId}
          onClose={handleCloseEditTreatment}
        />

        <div className="min-h-screen">
          <div className="flex w-full min-h-screen mt-[50px]">
            <Sidebar />

            <div className="w-3/4 p-10 ml-[25%]">


              <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-[#0F766E]">
                  Offers
                </h1>
                         {( roles.includes("admin") || roles.includes("receptionist")) && (

                <button
                  onClick={() => setShowAddOffer(true)}
                  className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
                >
                  + Add Offer
                </button>)}
              </div>

              <div className="w-1/3 mb-6">
                <input
                  type="text"
                  placeholder="Search offers..."
                  value={offerSearch}
                  onChange={(e) =>
                    setOfferSearch(e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                />
              </div>

              <table className="min-w-full text-left text-sm text-black">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pl-4">ID</th>
                    <th>Offer Name</th>
                    <th>Price</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Treatments</th>
                                           {( roles.includes("admin") || roles.includes("receptionist")) && (
  <th>Actions</th>)}
                  </tr>
                </thead>

                <tbody>
                  {filteredOffers.map((off) => (
                    <tr
                      key={off.offers_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 pl-4">
                        {off.offers_id}
                      </td>
                      <td>{off.offers_name}</td>
                      <td>{off.price} €</td>
                      <td>{off.start_date}</td>
                      <td>{off.end_date}</td>
                      <td>
                        {off.Treatments?.map((t) => t.treatment_name).join(", ")}
                      </td>
                      <td className="py-4">
                         {( roles.includes("admin") || roles.includes("receptionist")) && (
                        <div className="flex gap-2">
                           
                          <button
                            onClick={() => {
                              setSelectedId(off.offers_id);
                              setDeleteType("offer");
                              setConfirmOpen(true);
                            }}
                            className="text-red-500 px-3 py-1"
                          >
                            Delete
                          </button>
                          
                        

                          <button
                            onClick={() => {
                              setEditOfferId(off.offers_id);
                              setShowEditOffer(true);
                            }}
                            className="text-green-600 px-3 py-1"
                          >
                            Update
                          </button>
                        </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredOffers.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No offers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="mt-[80px] flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-[#0F766E]">
                  Treatments
                </h1>

                                       {( roles.includes("admin") || roles.includes("receptionist")) && (
  <button
                  onClick={() => setShowAddTreatment(true)}
                  className="bg-[#0F766E] text-white px-4 py-2 rounded-lg"
                >
                  + Add Treatment
                </button>)}
              </div>

              <div className="w-1/3 mb-6">
                <input
                  type="text"
                  placeholder="Search treatments..."
                  value={treatmentSearch}
                  onChange={(e) =>
                    setTreatmentSearch(e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                />
              </div>

              <table className="min-w-full text-left text-sm text-black">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pl-4">ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Department</th>
                    {(roles.includes("admin") || roles.includes("receptionist"))  &&(
                    <th>Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredTreatments.map((t) => (
                    <tr
                      key={t.treatment_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 pl-4">
                        {t.treatment_id}
                      </td>
                      <td>{t.treatment_name}</td>
                      <td>{t.description}</td>
                      <td>{t.price} €</td>
                      <td>{t.average_duration}</td>
                      <td>{t.Department?.department_name}</td>
                      <td className="py-4">
                        {( roles.includes("admin") || roles.includes("receptionist"))&&(
                        <div className="flex gap-2">
                         
                          <button
                            onClick={() => {
                              setSelectedId(t.treatment_id);
                              setDeleteType("treatment");
                              setConfirmOpen(true);
                            }}
                            className="text-red-500 px-3 py-1"
                          >
                            Delete
                          </button>
                           
                          <button
                            onClick={() => {
                              setEditTreatmentId(t.treatment_id);
                              setShowEditTreatment(true);
                            }}
                            className="text-green-600 px-3 py-1"
                          >
                            Update
                          </button>
                  
                        </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredTreatments.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No treatments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}