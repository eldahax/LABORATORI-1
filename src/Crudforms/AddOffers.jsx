import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddOffers({ show, onClose }) {
  const [offers_name, setOfferName] = useState("");
  const [price, setPrice] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const [treatments, setTreatments] = useState([]);
  const [treatment_ids, setTreatmentIds] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!show) return; 

    fetch("http://localhost:5000/api/treatments", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTreatments(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load treatments",
          type: "error",
        })
      );
  }, [show]);

  if (!show) return null;

  const handleCheckbox = (id) => {
    if (treatment_ids.includes(id)) {
      setTreatmentIds(treatment_ids.filter((t) => t !== id));
    } else {
      setTreatmentIds([...treatment_ids, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offers_name || !price || !start_date || !end_date) {
      setAlert({
        show: true,
        message: "All fields are required",
        type: "error",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/offers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offers_name,
          price,
          start_date,
          end_date,
          treatment_ids,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Create failed",
          type: "error",
        });
        return;
      }

      setAlert({
        show: true,
        message: "Offer created successfully",
        type: "success",
      });

      setOfferName("");
      setPrice("");
      setStartDate("");
      setEndDate("");
      setTreatmentIds([]);

  
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <CustomAlert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() =>
            setAlert((p) => ({ ...p, show: false }))
          }
        />

        <h1 className="text-[32px] font-bold text-[#0F766E] text-center mb-6">
          ADD OFFER
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Offer name"
            value={offers_name}
            onChange={(e) => setOfferName(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <div className="border p-3 rounded">
            <h3 className="font-semibold mb-2 text-[#0F766E]">Select Treatments</h3>

            {treatments.map((t) => (
              <label key={t.treatment_id} className="flex items-center gap-2 mb-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={treatment_ids.includes(t.treatment_id)}
                  onChange={() => handleCheckbox(t.treatment_id)}
                />
                {t.treatment_name}
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg hover:bg-[#0D665F]"
            >
              Add Offer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}