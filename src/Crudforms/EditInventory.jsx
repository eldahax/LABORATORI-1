import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

function EditInventoryForm({ inventoryId, onClose, onSuccess }) {
  const [form, setForm] = useState({
    item_name: "",
    category: "",
    cost: "",
    quantity: "",
    description: "",
  });

  const [itemErr, setItemErr] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [costErr, setCostErr] = useState("");
  const [quantityErr, setQuantityErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

  useEffect(() => {
    if (!inventoryId) return;

    const fetchInventoryData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/inventory/${inventoryId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Could not retrieve data");
        const data = await res.json();
        setForm({
          item_name: data.item_name || "",
          category: data.category || "",
          cost: data.cost || "",
          quantity: data.quantity || "",
          description: data.description || "",
        });
      } catch {
        setAlert({
          show: true,
          message: "Failed to load inventory item records.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [inventoryId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setItemErr("");
    setCategoryErr("");
    setCostErr("");
    setQuantityErr("");
    setDescriptionErr("");

    let hasError = false;

    if (!form.item_name.trim()) {
      setItemErr("Item name is required");
      hasError = true;
    } else if (!nameRegex.test(form.item_name)) {
      setItemErr("Invalid item name (3-50 chars)");
      hasError = true;
    }

    if (!form.category.trim()) {
      setCategoryErr("Category is required");
      hasError = true;
    }

    if (form.cost === "" || isNaN(form.cost) || parseFloat(form.cost) <= 0) {
      setCostErr("Valid cost is required");
      hasError = true;
    }

    if (form.quantity === "" || isNaN(form.quantity) || parseInt(form.quantity) <= 0) {
      setQuantityErr("Valid quantity is required");
      hasError = true;
    }

    if (!form.description.trim()) {
      setDescriptionErr("Description is required");
      hasError = true;
    }

    if (hasError || saving) return;

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/inventory/${inventoryId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: form.item_name,
          category: form.category,
          cost: parseFloat(form.cost),
          quantity: parseInt(form.quantity),
          description: form.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Update cycle failed",
          type: "error",
        });
        setSaving(false);
        return;
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch {
      setAlert({
        show: true,
        message: "Server error encountered on submission",
        type: "error",
      });
      setSaving(false);
    }
  };

  return (
    <>
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white p-8 rounded-2xl relative flex flex-col gap-4 text-black shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer transition"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-[#134E4A] text-center border-b pb-2">
          Edit Inventory Item
        </h1>

        {loading ? (
          <div className="text-center py-8 text-gray-500 font-medium">
            Loading item information...
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Item Name</label>
              <input
                name="item_name"
                value={form.item_name}
                onChange={handleChange}
                placeholder="Item Name"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {itemErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{itemErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="p-3 border rounded-lg text-sm border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              >
                <option value="">Select Category</option>
                <option value="consumable">Consumable</option>
                <option value="instrument">Instrument</option>
                <option value="anesthetic">Anesthetic</option>
                <option value="medication">Medication</option>
                <option value="other">Other</option>
              </select>
              {categoryErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{categoryErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Cost</label>
              <input
                type="number"
                name="cost"
                value={form.cost}
                onChange={handleChange}
                placeholder="Cost"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {costErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{costErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {quantityErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{quantityErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {descriptionErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{descriptionErr}</p>}
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-teal-800 transition shadow-md disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Updating..." : "Update Item"}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default function EditInventoryModal({ show, inventoryId, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <EditInventoryForm inventoryId={inventoryId} onClose={onClose} onSuccess={onSuccess} />
    </div>
  );
}