import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function InventoryTable() {
    const [inventorys, setInventorys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/inventory")
            .then((res) => res.json())
            .then((data) => setInventorys(data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = async (inventory_id) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/inventory/${inventory_id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                setInventorys((prev) =>
                    prev.filter(
                        (inventory) => inventory.inventory_id !== inventory_id
                    )
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

                    <div className="w-3/4 p-10 ml-[25%]">
                        <TableCard />

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                                Inventory
                            </h1>

                            <button
                                onClick={() => navigate("/addI")}
                                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
                            >
                                + Add Inventory
                            </button>
                        </div>

                        <table className="min-w-full text-left text-sm sm:text-base text-black">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 pl-4">ID</th>
                                    <th className="py-2">Item name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {inventorys.map((inventory) => (
                                    <tr
                                        key={inventory.inventory_id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4 pl-4">
                                            {inventory.inventory_id}
                                        </td>

                                        <td>{inventory.item_name}</td>
                                        <td>{inventory.category}</td>
                                        <td>{inventory.quantity}</td>
                                        <td>{inventory.cost}</td>
                                        <td>{inventory.description}</td>

                                        <td className="flex gap-2 py-2">
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        inventory.inventory_id
                                                    )
                                                }
                                                className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/inventory/edit/${inventory.inventory_id}`
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