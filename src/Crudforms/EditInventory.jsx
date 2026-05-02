import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;

  useEffect(() => {
    fetch(`http://localhost:5000/api/inventory/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          item_name: data.item_name,
          category: data.category,
          cost: data.cost,
          quantity: data.quantity,
          description: data.description,
        });
      })
      .catch(() => {});
  }, [id]);

  const handleChange = (e) => {
    setForm({
      item_name: form.item_name,
      category: form.category,
      cost: form.cost,
      quantity: form.quantity,
      description: form.description,
      [e.target.name]: e.target.value,
    });
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

    if (form.cost === "" || isNaN(form.cost)) {
      setCostErr("Valid cost is required");
      hasError = true;
    }

    if (form.quantity === "" || isNaN(form.quantity)) {
      setQuantityErr("Valid quantity is required");
      hasError = true;
    }

    if (!form.description.trim()) {
      setDescriptionErr("Description is required");
      hasError = true;
    }

    if (hasError) return;

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_name: form.item_name,
        category: form.category,
        cost: parseFloat(form.cost),
        quantity: parseInt(form.quantity),
        description: form.description,
      }),
    });

    navigate("/inventory");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
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
          <p className="text-red-500 text-sm">{descriptionErr}</p>
        </div>

        <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
          Update Inventory
        </button>
      </form>
    </div>
  );
}
