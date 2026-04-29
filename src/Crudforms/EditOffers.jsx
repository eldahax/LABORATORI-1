import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditOffer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [offers_name, setOfferName] = useState("");
    const [price, setPrice] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [treatments, setTreatments] = useState([]);
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/offers/${id}`)
            .then(res => res.json())
            .then(data => {
                setOfferName(data.offers_name || "");
                setPrice(data.price || "");

                setStartDate(data.start_date || "");
                setEndDate(data.end_date || "");

                setSelectedTreatments(
                    data.Treatments
                        ? data.Treatments.map(t => t.treatment_id)
                        : data.treatments
                            ? data.treatments.map(t => t.treatment_id)
                            : []
                );
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:5000/api/treatments")
            .then(res => res.json())
            .then(data => setTreatments(data))
            .catch(err => console.log(err));
    }, []);

    const handleCheckbox = (treatment_id) => {
        if (selectedTreatments.includes(treatment_id)) {
            setSelectedTreatments(
                selectedTreatments.filter(id => id !== treatment_id)
            );
        } else {
            setSelectedTreatments(
                [...selectedTreatments, treatment_id]
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!offers_name || !price || !start_date || !end_date) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/offers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    offers_name: offers_name,
                    price: price,
                    start_date: start_date,
                    end_date: end_date,
                    treatment_ids: selectedTreatments
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Update failed");
                return;
            }

            alert("Offer updated successfully");
            navigate("/offers");

        } catch (err) {
            console.log(err);
            setError("Server error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                    value={offers_name}
                    onChange={(e) => setOfferName(e.target.value)}
                    placeholder="Offer name"
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />

                <input
                    type="date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                    type="date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <div>
                    {treatments.map(t => (
                        <label key={t.treatment_id}>
                            <input
                                type="checkbox"
                                checked={selectedTreatments.includes(t.treatment_id)}
                                onChange={() => handleCheckbox(t.treatment_id)}
                            />
                            {t.treatment_name}
                        </label>
                    ))}
                </div>

                {error && <p>{error}</p>}

                <button type="button" onClick={() => navigate("/offers")}>
                    Cancel
                </button>

                <button type="submit">
                    Save
                </button>

            </form>
        </div>
    );
}