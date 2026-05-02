import { useState } from "react";

export default function AddInventory() {
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

  const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInventoryError("");
    setCategoryError("");
    setCostError("");
    setQuantityError("");
    setDescriptionError("");
    setSignupErr("");

    let hasError = false;

    if (item_name.trim() === "") {
      setInventoryError("item name is required");
      hasError = true;
    } else if (!nameRegex.test(item_name)) {
      setInventoryError("Invalid item name (3-50 chars, no special symbols)");
      hasError = true;
    }

    if (category.trim() === "") {
      setCategoryError("Category is required");
      hasError = true;
    }

    if (cost === "") {
      setCostError("Valid cost is required");
      hasError = true;
    }

    if (quantity === "") {
      setQuantityError("Quantity is required");
      hasError = true;
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: item_name,
          category: category,
          cost: parseFloat(cost),
          quantity: parseInt(quantity),
          description: description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSignupErr(data.error || "Something went wrong");
        return;
      }

      alert("Item added to inventory successfully!");

      setInventoryName("");
      setCategory("");
      setCost("");
      setQuantity("");
      setDescription("");
    } catch (err) {
      console.error("Submission Error:", err);
      setSignupErr("Failed to connect to the server.");
    }
    setSignupErr("");
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-[32px] font-bold text-[#0F766E] text-center tracking-tight mb-6">
          ADD TO INVENTORY
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Item Name"
              value={item_name}
              onChange={(e) => setInventoryName(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 text-xs mt-1">{inventoryError}</p>
          </div>

          <div className="flex flex-col">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Select Category</option>
              <option value="consumable">Consumable</option>
              <option value="instrument">Instrument</option>
              <option value="anesthetic">Anesthetic</option>
              <option value="medication">Medication</option>
              <option value="other">Other</option>
            </select>
            <p className="text-red-500 text-xs mt-1">{categoryError}</p>
          </div>

          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 text-xs mt-1">{costError}</p>
          </div>

          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 text-xs mt-1">{quantityError}</p>
          </div>

          <div className="flex flex-col">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A] h-24"
            />
            <p className="text-red-500 text-xs mt-1">{descriptionError}</p>
          </div>

          {signupErr && (
            <p className="text-red-500 text-center font-semibol">{signupErr}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-[#134E4A] transition-all"
          >
            Add to Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
