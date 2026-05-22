import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditOffer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offers_name, setOfferName] = useState("");
  const [price, setPrice] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const [treatments, setTreatments] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/offers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOfferName(data.offers_name || "");
        setPrice(data.price || "");
        setStartDate(data.start_date || "");
        setEndDate(data.end_date || "");

        setSelectedTreatments(
          data.Treatments?.map((t) => t.treatment_id) || []
        );
      })
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load offer",
          type: "error",
        })
      );
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/api/treatments")
      .then((res) => res.json())
      .then((data) => setTreatments(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load treatments",
          type: "error",
        })
      );
  }, []);

  const handleCheckbox = (id) => {
    setSelectedTreatments((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
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
      const res = await fetch(
        `http://localhost:5000/api/offers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            offers_name,
            price,
            start_date,
            end_date,
            treatment_ids: selectedTreatments,
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
        return;
      }

      setAlert({
        show: true,
        message: "Offer updated successfully",
        type: "success",
      });

      setTimeout(() => navigate("/offers"), 800);
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full max-w-md p-8 rounded-xl">

        <CustomAlert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() =>
            setAlert((p) => ({ ...p, show: false }))
          }
        />

        <h1 className="text-[32px] font-bold text-[#0F766E] text-center mb-6">
          EDIT OFFER
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={offers_name}
            onChange={(e) => setOfferName(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />

          <input
            type="number"
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
            <h3>Select Treatments</h3>

            {treatments.map((t) => (
              <label key={t.treatment_id} className="block">
                <input
                  type="checkbox"
                  checked={selectedTreatments.includes(t.treatment_id)}
                  onChange={() => handleCheckbox(t.treatment_id)}
                />
                {t.treatment_name}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white py-2 rounded-lg"
          >
            Save
          </button>

        </form>
      </div>
    </div>
  );
}