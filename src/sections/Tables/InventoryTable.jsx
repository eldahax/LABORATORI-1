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
          Are you sure you want to delete this inventory item?
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

export default function InventoryTable() {
  const [inventorys, setInventorys] = useState([]);
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setInventorys(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load inventory",
          type: "error",
        })
      );
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/inventory/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setAlert({
          show: true,
          message: "Delete failed",
          type: "error",
        });

        return;
      }

      setInventorys((prev) =>
        prev.filter(
          (inventory) =>
            inventory.inventory_id !== selectedId
        )
      );

      setAlert({
        show: true,
        message: "Inventory deleted successfully",
        type: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setConfirmOpen(false);
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
                        onClick={() => {
                          setSelectedId(
                            inventory.inventory_id
                          );
                          setConfirmOpen(true);
                        }}
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