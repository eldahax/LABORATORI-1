import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

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

  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
      setInventoryError(
        "Invalid item name (3-50 chars, no special symbols)"
      );
      hasError = true;
    }

    if (category.trim() === "") {
      setCategoryError("Category is required");
      hasError = true;
    }

    if (cost === "" || parseFloat(cost) <= 0) {
      setCostError("Valid cost is required");
      hasError = true;
    }

    if (quantity === "" || parseInt(quantity) <= 0) {
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

        setAlertMessage(data.error || "Failed to add inventory");
        setAlertType("error");
        setShowAlert(true);

        setLoading(false);
        return;
      }

      setAlertMessage("Item added successfully!");
      setAlertType("success");
      setShowAlert(true);

      setInventoryName("");
      setCategory("");
      setCost("");
      setQuantity("");
      setDescription("");

      setLoading(false);
    } catch (err) {
      console.error(err);

      setSignupErr("Failed to connect to the server.");

      setAlertMessage("Server connection failed");
      setAlertType("error");
      setShowAlert(true);

      setLoading(false);
    }
  };

  return (
    <>
      <CustomAlert
        show={showAlert}
        message={alertMessage}
        type={alertType}
        onClose={() => setShowAlert(false)}
      />

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
                onChange={(e) => {
                  setInventoryName(e.target.value);
                  setInventoryError("");
                }}
                className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
              />
              <p className="text-red-500 text-xs mt-1">
                {inventoryError}
              </p>
            </div>

            <div className="flex flex-col">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryError("");
                }}
                className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select Category</option>
                <option value="consumable">Consumable</option>
                <option value="instrument">Instrument</option>
                <option value="anesthetic">Anesthetic</option>
                <option value="medication">Medication</option>
                <option value="other">Other</option>
              </select>
              <p className="text-red-500 text-xs mt-1">
                {categoryError}
              </p>
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Cost"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                  setCostError("");
                }}
                className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
              />
              <p className="text-red-500 text-xs mt-1">
                {costError}
              </p>
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setQuantityError("");
                }}
                className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2"
              />
              <p className="text-red-500 text-xs mt-1">
                {quantityError}
              </p>
            </div>

            <div className="flex flex-col">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 h-24"
              />
              <p className="text-red-500 text-xs mt-1">
                {descriptionError}
              </p>
            </div>

            {signupErr && (
              <p className="text-red-500 text-center">
                {signupErr}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F766E] text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-[#134E4A] transition-all"
            >
              {loading ? "ADDING..." : "Add to Inventory"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}