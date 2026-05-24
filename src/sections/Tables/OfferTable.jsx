import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";


function ConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">

                <h2 className="text-lg font-bold mb-2">
                    Confirm Delete
                </h2>

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

    const [offerSearch, setOfferSearch] = useState("");
    const [treatmentSearch, setTreatmentSearch] = useState("");

    const [selectedId, setSelectedId] = useState(null);
    const [deleteType, setDeleteType] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const navigate = useNavigate();


    const showAlert = (message, type = "success") => {
        setAlert({
            show: true,
            message,
            type,
        });
    };


    useEffect(() => {
        fetch("http://localhost:5000/api/treatments", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setTreatments(data))
            .catch(() =>
                showAlert("Failed to load treatments", "error")
            );
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/offers", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setOffers(data))
            .catch(() =>
                showAlert("Failed to load offers", "error")
            );
    }, []);


    const openDelete = (id, type) => {
        setSelectedId(id);
        setDeleteType(type);
        setConfirmOpen(true);
    };

    const closeDelete = () => {
        setSelectedId(null);
        setDeleteType("");
        setConfirmOpen(false);
    };

    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            let url = "";

            if (deleteType === "offer") {
                url = `http://localhost:5000/api/offers/${selectedId}`;
            }

            if (deleteType === "treatment") {
                url = `http://localhost:5000/api/treatments/${selectedId}`;
            }

            const res = await fetch(url, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                showAlert("Delete failed", "error");
                return;
            }

            if (deleteType === "offer") {
                setOffers((prev) =>
                    prev.filter((o) => o.offers_id !== selectedId)
                );
            }

            if (deleteType === "treatment") {
                setTreatments((prev) =>
                    prev.filter((t) => t.treatment_id !== selectedId)
                );
            }

            showAlert("Deleted successfully", "success");
            closeDelete();

        } catch (err) {
            showAlert("Server error", "error");
        }
    };

    const filteredOffers = offers.filter((off) => {
        const name = (off.offers_name || "").toLowerCase();
        const treatmentsText =
            (off.Treatments?.map((t) => t.treatment_name).join(" ") || "").toLowerCase();

        return (
            name.includes(offerSearch.toLowerCase()) ||
            treatmentsText.includes(offerSearch.toLowerCase())
        );
    });

    const filteredTreatments = treatments.filter((t) => {
        const name = (t.treatment_name || "").toLowerCase();
        const department = (t.Department?.department_name || "").toLowerCase();

        return (
            name.includes(treatmentSearch.toLowerCase()) ||
            department.includes(treatmentSearch.toLowerCase())
        );
    });

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
            <Navbar />

            <div className="min-h-screen">
                <div className="flex w-full min-h-screen mt-[50px]">
                    <Sidebar />

                    <div className="w-3/4 ml-[25%]">
                        <TableCard />


                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-bold text-[#0F766E]">
                                Offers
                            </h1>

                            <button
                                onClick={() =>
                                    navigate("/addO")
                                }
                                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F]"
                            >
                                + Add Offer
                            </button>
                        </div>
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
                            onConfirm={handleDelete}
                        />
                        <div className="w-1/2 max-w-sm mb-6">
                            <input
                                type="text"
                                placeholder="Search offers..."
                                value={offerSearch}
                                onChange={(e) =>
                                    setOfferSearch(
                                        e.target.value
                                    )
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
                                    <th>Actions</th>
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

                                        <td>
                                            {off.offers_name}
                                        </td>

                                        <td>
                                            {off.price} €
                                        </td>

                                        <td>
                                            {off.start_date}
                                        </td>

                                        <td>
                                            {off.end_date}
                                        </td>

                                        <td>
                                            {off.Treatments?.map(
                                                (t) =>
                                                    t.treatment_name
                                            ).join(", ")}
                                        </td>

                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => openDelete(off.offers_id)}
                                                className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/offers/edit/${off.offers_id}`
                                                    )
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

                        <div className="flex justify-between items-center mb-6 mt-30">
                            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                                Treatments
                            </h1>

                            <button
                                onClick={() =>
                                    navigate("/addT")
                                }
                                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F]"
                            >
                                + Add Treatment
                            </button>
                        </div>

                        <div className="w-1/2 max-w-sm mb-6">
                            <input
                                type="text"
                                placeholder="Search treatments..."
                                value={treatmentSearch}
                                onChange={(e) =>
                                    setTreatmentSearch(
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                            />
                        </div>

                        <table className="min-w-full text-left text-sm sm:text-base text-black">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 pl-4">ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Duration</th>
                                    <th>Department</th>
                                    <th>Actions</th>
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
                                        <td>{t.price}</td>
                                        <td>{t.average_duration}</td>
                                        <td>
                                            {t.Department?.department_name}
                                        </td>

                                        <td className="flex gap-2 py-2">
                                            <button
                                                onClick={() => openDelete(t.treatment_id, "treatment")}
                                                className="text-red-500 px-3 py-1"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/treatments/edit/${t.treatment_id}`
                                                    )
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
        </div>
    );
}