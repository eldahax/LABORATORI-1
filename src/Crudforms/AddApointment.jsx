import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../components/costumFetch";

const stripePromise = loadStripe("pk_test_51TaeDAF3VKWlDYBwcOZJ0lEeZkdUCEHRZKk3L26o3IgIDMWZVoGW9XuvJkb3xcoHiuI8GXXc1ZsIJaCFum6Jr8sy00IIyPt5Uh");

function BookingAndPaymentForm({ onClose, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [filtered, setFilteredTreatments] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));

    API.get("/treatments")
      .then((res) => setTreatments(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!doc) {
      setFilteredTreatments([]);
      return;
    }

    const selectedDoctor = doctors.find(
      (d) => Number(d.doctor_id) === Number(doc)
    );

    if (!selectedDoctor || !selectedDoctor.Departments) {
      setFilteredTreatments([]);
      return;
    }

    const departmentIds = selectedDoctor.Departments.map(
      (d) => d.department_id
    );

    const filteredList = treatments.filter((t) =>
      departmentIds.includes(t.department_id)
    );

    setFilteredTreatments(filteredList);
    setReason("");
  }, [doc, doctors, treatments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setErrorMsg("");
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { token, error: stripeError } = await stripe.createToken(cardElement, {
        name,
      });

      if (stripeError) throw new Error(stripeError.message);

      const res = await API.post("/appointments", {
        full_name: name,
        doctor: doc,
        email,
        phone_number: phone,
        appointment_date_time: date,
        description: reason,
        stripeToken: token.id,
      });

      if (onPaymentSuccess) onPaymentSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message);
    } finally {
      loading && setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col gap-4 p-6 bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto relative"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Book Appointment & Pay
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Doctor
          </label>
          <select
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          >
            <option value="">Select a doctor</option>
            {doctors.map((d) => (
              <option key={d.doctor_id} value={d.doctor_id}>
                {d.User?.first_name} {d.User?.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Phone Number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Date and Time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">
            Treatment
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-black rounded-lg px-3 py-2"
          >
            <option value="">Select a treatment</option>

            {filtered.map((t) => (
              <option key={t.treatment_id} value={t.treatment_name}>
                {t.treatment_name}{" "}
                {t.price ? `- $${t.price}` : "- N/A"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 p-4 border border-teal-600 rounded-lg bg-teal-50/30">
        <label className="block mb-2 font-bold text-teal-900 text-sm">
          Credit or Debit Card
        </label>

        <CardElement />
      </div>
      {errorMsg && (
        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
      )}

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2 bg-teal-700 text-white rounded-md"
        >
          {loading ? "PROCESSING..." : "CONFIRM & PAY NOW"}
        </button>
      </div>
    </form>
  );
}

export default function BookingModal({
  show,
  onClose,
  onPaymentSuccess,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Elements stripe={stripePromise}>
        <BookingAndPaymentForm
          onClose={onClose}
          onPaymentSuccess={onPaymentSuccess}
        />
      </Elements>
    </div>
  );
}