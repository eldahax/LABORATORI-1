import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";
import EditInventoryModal from "../../Crudforms/EditInventory";
import AddInventoryModal from "../../Crudforms/AddInventory";
import API from "../../components/costumFetch";

function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-black">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this inventory item?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-gray-600">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function InventoryTable() {
  const [inventorys, setInventorys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editInventoryOpen, setEditInventoryOpen] = useState(false);
  const [editInventoryId, setEditInventoryId] = useState(null);
  const [addInventoryOpen, setAddInventoryOpen] = useState(false); // Toggle trigger state
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const fetchInventory = () => {
    API.get("/inventory")
      .then((res) => setInventorys(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const res = await API.delete(`/inventory/${selectedId}`);
      if (res.status === 200 || res.status === 204) {
        setInventorys(inventorys.filter((item) => item.inventory_id !== selectedId));
        setAlert({
          show: true,
          message: "Inventory item successfully deleted.",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setAlert({
        show: true,
        message: err.response?.data?.error || "Failed to complete inventory delete operation",
        type: "error",
      });
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const handleEditInventorySuccess = () => {
    setAlert({ show: true, message: "Inventory changes saved cleanly!", type: "success" });
    fetchInventory();
  };

  const handleAddInventorySuccess = () => {
    setAlert({ show: true, message: "New inventory item added to records!", type: "success" });
    fetchInventory();
  };

  const filteredInventory = inventorys.filter((item) => {
    const itemName = item.item_name?.toLowerCase() || "";
    const category = item.category?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const lowerSearch = searchTerm.toLowerCase();
    return itemName.includes(lowerSearch) || category.includes(lowerSearch) || description.includes(lowerSearch);
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl mb-8 overflow-x-auto">
      <Navbar />
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ show: false, message: "", type: "success" })}
      />

      <ConfirmModal show={confirmOpen} onConfirm={handleDelete} onCancel={() => { setConfirmOpen(false); setSelectedId(null); }} />
      <EditInventoryModal show={editInventoryOpen} inventoryId={editInventoryId} onClose={() => { setEditInventoryOpen(false); setEditInventoryId(null); }} onSuccess={handleEditInventorySuccess} />


      <AddInventoryModal show={addInventoryOpen} onClose={() => setAddInventoryOpen(false)} onSuccess={handleAddInventorySuccess} />

      <div className="min-h-screen">
        <div className="flex w-full min-h-screen mt-[50px]">
          <Sidebar />
          <div className="w-3/4 p-10 ml-[25%]">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">INVENTORY</h1>
                <button
                  onClick={() => setAddInventoryOpen(true)}
                  className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition cursor-pointer font-semibold text-sm shadow-sm"
                >
                  + Add Inventory
                </button>
              </div>

              <div className="w-1/2 max-w-sm mb-6">
                <input
                  type="text"
                  placeholder="Search by name, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0F766E] border-gray-300 shadow-sm"
                />
              </div>

              <table className="min-w-full text-left text-sm sm:text-base text-black">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pl-4">ID</th>
                    <th className="py-2">Item Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.inventory_id} className="border-b hover:bg-gray-50">
                      <td className="py-4 pl-4">{item.inventory_id}</td>
                      <td className="py-2">{item.item_name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.cost}</td>
                      <td>{item.description || "—"}</td>
                      <td className="flex gap-2 py-3">
                        <button onClick={() => { setSelectedId(item.inventory_id); setConfirmOpen(true); }} className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg transition cursor-pointer">Delete</button>
                        <button onClick={() => { setEditInventoryId(item.inventory_id); setEditInventoryOpen(true); }} className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg transition cursor-pointer">Update</button>
                      </td>
                    </tr>
                  ))}
                  {filteredInventory.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-8 text-gray-500">No matching inventory items found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}