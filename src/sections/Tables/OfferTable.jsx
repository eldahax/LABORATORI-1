import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function OfferTable() {

       const [treatments, setTreatments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/treatments")
            .then((res) => res.json())
            .then((data) => setTreatments(data))
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteD = async (treatment_id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch(
                `http://localhost:5000/api/treatments/${treatment_id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                setTreatments((prev) =>
                    prev.filter((t) => t.treatment_id !== treatment_id)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [offers, setOffers] = useState([]);
   

    useEffect(() => {
        fetch("http://localhost:5000/api/offers")
            .then(res => res.json())
            .then(data => setOffers(data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (offers_id) => {
        if (!window.confirm("Are you sure you want to delete this offer?")) return;

        try {
            const res = await fetch(
                `http://localhost:5000/api/offers/${offers_id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                setOffers(prev =>
                    prev.filter(off => off.offers_id !== offers_id)
                );
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

                    <div className="w-3/4 ml-[25%]">

                        <TableCard />



                       
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-bold text-[#0F766E]">
                                Offers
                            </h1>

                            <button
                                onClick={() => navigate("/addO")}
                                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F]"
                            >
                                + Add Offer
                            </button>
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
                                {offers.map((off) => (
                                    <tr key={off.offers_id} className="border-b hover:bg-gray-50">

                                        <td className="py-4 pl-4">{off.offers_id}</td>
                                        <td>{off.offers_name}</td>
                                        <td>{off.price} €</td>
                                        <td>{off.start_date}</td>
                                        <td>{off.end_date}</td>

                                        <td>
                                            {off.Treatments?.map(t => t.treatment_name).join(", ")}
                                        </td>

                                        <td className="flex gap-2">

                                            <button
                                                onClick={() => handleDelete(off.offers_id)}
                                                className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/offers/edit/${off.offers_id}`)
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
                                    onClick={() => navigate("/addT")}
                                    className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
                                >
                                    + Add Treatment
                                </button>
                            </div>

                            <table className="min-w-full text-left text-sm sm:text-base text-black">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-3 pl-4">ID</th>
                                        <th className="py-2">Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Duration</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {treatments.map((t) => (
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
                                                    onClick={() =>
                                                        handleDeleteD(t.treatment_id)
                                                    }
                                                    className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/treatments/edit/${t.treatment_id}`)
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