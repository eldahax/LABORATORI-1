import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

  useEffect(() => {
    fetch(`http://localhost:5000/api/inventory/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          item_name: data.item_name || "",
          category: data.category || "",
          cost: data.cost || "",
          quantity: data.quantity || "",
          description: data.description || "",
        });
      })
      .catch(() => {
        setAlert({
          show: true,
          message: "Error loading inventory item",
          type: "error",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "item_name") setItemErr("");
    if (name === "category") setCategoryErr("");
    if (name === "cost") setCostErr("");
    if (name === "quantity") setQuantityErr("");
    if (name === "description") setDescriptionErr("");
  };

  const validate = () => {
    let hasError = false;

    setItemErr("");
    setCategoryErr("");
    setCostErr("");
    setQuantityErr("");
    setDescriptionErr("");

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

    if (form.cost === "" || isNaN(form.cost) || form.cost <= 0) {
      setCostErr("Valid cost is required");
      hasError = true;
    }

    if (
      form.quantity === "" ||
      isNaN(form.quantity) ||
      form.quantity <= 0
    ) {
      setQuantityErr("Valid quantity is required");
      hasError = true;
    }

    if (!form.description.trim()) {
      setDescriptionErr("Description is required");
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/inventory/${id}`,
        {
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
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Update failed",
          type: "error",
        });

        setLoading(false);
        return;
      }

      setAlert({
        show: true,
        message: "Inventory updated successfully",
        type: "success",
      });

      setTimeout(() => {
        navigate("/inventory");
      }, 1200);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Edit Inventory
        </h1>

        <div>
          <input
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            placeholder="Item Name"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{itemErr}</p>
        </div>

        <div>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Select Category</option>
            <option value="consumable">Consumable</option>
            <option value="instrument">Instrument</option>
            <option value="anesthetic">Anesthetic</option>
            <option value="medication">Medication</option>
            <option value="other">Other</option>
          </select>

          <p className="text-red-500 text-sm">{categoryErr}</p>
        </div>

        <div>
          <input
            name="cost"
            type="number"
            value={form.cost}
            onChange={handleChange}
            placeholder="Cost"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{costErr}</p>
        </div>

        <div>
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{quantityErr}</p>
        </div>

        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">
            {descriptionErr}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/inventory")}
            className="w-1/2 border-2 border-gray-300 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "UPDATING..." : "Update Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
}