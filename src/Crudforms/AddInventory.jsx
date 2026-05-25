import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

function AddInventoryForm({ onClose, onSuccess }) {
  const [item_name, setInventoryName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [signupErr, setSignupErr] = useState("");
  const [inventoryError, setInventoryError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [costError, setCostError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    setInventoryError("");
    setCategoryError("");
    setCostError("");
    setQuantityError("");
    setDescriptionError("");
    setSignupErr("");

    let hasError = false;

    if (item_name.trim() === "") {
      setInventoryError("Item name is required");
      hasError = true;
    } else if (!nameRegex.test(item_name)) {
      setInventoryError("Invalid item name (3-50 chars, no special symbols)");
      hasError = true;
    }

    if (category.trim() === "") {
      setCategoryError("Category is required");
      hasError = true;
    }

    if (cost === "" || isNaN(cost) || parseFloat(cost) <= 0) {
      setCostError("Valid cost is required");
      hasError = true;
    }

    if (quantity === "" || isNaN(quantity) || parseInt(quantity) <= 0) {
      setQuantityError("Valid quantity is required");
      hasError = true;
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name,
          category,
          cost: parseFloat(cost),
          quantity: parseInt(quantity),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSignupErr(data.error || "Something went wrong");
        setAlert({
          show: true,
          message: data.error || "Failed to add inventory",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setSignupErr("Failed to connect to the server.");
      setAlert({
        show: true,
        message: "Server connection failed",
        type: "error",
      });
      setLoading(false);
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
        className="w-[450px] bg-white p-8 rounded-2xl relative flex flex-col gap-4 text-black shadow-2xl animate-fade-in"
      >
      
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer transition"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-[#134E4A] text-center border-b pb-2">
          Add New Item
        </h1>

        {signupErr && <p className="text-red-500 text-xs font-semibold text-center">{signupErr}</p>}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-700">Item Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={item_name}
            onChange={(e) => {
              setInventoryName(e.target.value);
              setInventoryError("");
            }}
            className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          {inventoryError && <p className="text-red-500 text-xs font-semibold mt-0.5">{inventoryError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCategoryError("");
            }}
            className="p-3 border rounded-lg text-sm border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          >
            <option value="">Select Category</option>
            <option value="consumable">Consumable</option>
            <option value="instrument">Instrument</option>
            <option value="anesthetic">Anesthetic</option>
            <option value="medication">Medication</option>
            <option value="other">Other</option>
          </select>
          {categoryError && <p className="text-red-500 text-xs font-semibold mt-0.5">{categoryError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-700">Cost</label>
          <input
            type="number"
            step="0.01"
            placeholder="Cost"
            value={cost}
            onChange={(e) => {
              setCost(e.target.value);
              setCostError("");
            }}
            className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          {costError && <p className="text-red-500 text-xs font-semibold mt-0.5">{costError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-700">Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setQuantityError("");
            }}
            className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          {quantityError && <p className="text-red-500 text-xs font-semibold mt-0.5">{quantityError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-700">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
            }}
            className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          {descriptionError && <p className="text-red-500 text-xs font-semibold mt-0.5">{descriptionError}</p>}
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
            disabled={loading}
            className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-teal-800 transition shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function AddInventoryModal({ show, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AddInventoryForm onClose={onClose} onSuccess={onSuccess} />
    </div>
  );
}