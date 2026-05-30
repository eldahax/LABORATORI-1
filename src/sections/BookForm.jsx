import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51TaeDAF3VKWlDYBwcOZJ0lEeZkdUCEHRZKk3L26o3IgIDMWZVoGW9XuvJkb3xcoHiuI8GXXc1ZsIJaCFum6Jr8sy00IIyPt5Uh");
function BookingAndPaymentForm() {
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
    fetch("http://localhost:5000/api/doctors"
      ,{
        credentials:"include"
      }
    ).then(res => res.json()).then(data => setDoctors(data));
    fetch("http://localhost:5000/api/treatments",{
      credentials:"include"
    })
    .then(res => res.json())
    .then(data => setTreatments(data));
  }, []);
useEffect(() => {
  if (!doc) {
    setFilteredTreatments([]);
    return;
  }

  const selectedDoctor = doctors.find(
    (d) => Number(d.doctor_id) === Number(doc)
  );

  if (!selectedDoctor) return;
  const doctorDepartments =
    selectedDoctor.Departments || [];

  const departmentIds = doctorDepartments.map(
    (d) => d.department_id
  );

  const filtered = treatments.filter((t) =>
    departmentIds.includes(t.department_id)
  );

  setFilteredTreatments(filtered);
  setReason("");
}, [doc, doctors, treatments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return; 

    setErrorMsg("");
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { token, error: stripeError } = await stripe.createToken(cardElement, { name });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          doctor: doc,
          email,
          phone_number: phone,
          appointment_date_time: date,
          description: reason,
          stripeToken: token.id 
        }),
      });

      const data = await res.json();
      console.log(reason);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong processing appointment payment.");
      }

      alert("Appointment Booked and Paid Successfully!");
      
     
      setName(""); setDoc(""); setReason(""); setEmail(""); setPhone(""); setDate("");
      cardElement.clear();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[60%] flex flex-col gap-4 mt-[60px] mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Book Appointment & Pay</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Doctor</label>
          <select value={doc} onChange={(e) => setDoc(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2">
            <option value="">Select a doctor</option>
            {doctors.map(d => <option key={d.doctor_id} value={d.doctor_id}>{d.User?.first_name} {d.User?.last_name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Phone Number</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Date and Time</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-bold text-black text-sm">Treatment</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} required className="w-full border border-black rounded-lg px-3 py-2">
            <option value="">Select a treatment</option>
            {filtered.map(t => <option key={t.treatment_id} value={t.treatment_name}>{t.treatment_name} {t.price}$
            </option>)}
          </select>
          
        </div>
      </div>

      <div className="mt-4 p-4 border border-teal-600 rounded-lg bg-teal-50/30">
        <label className="block mb-2 font-bold text-teal-900 text-sm">Credit or Debit Card</label>
        <div className="p-3 bg-white border border-gray-300 rounded-md shadow-sm">
          <CardElement options={{ style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } } } }} />
        </div>
      </div>

      {errorMsg && <p className="text-red-600 text-sm font-semibold text-center mt-2">{errorMsg}</p>}

      <div className="text-center mt-2">
        <button type="submit" disabled={loading} className="px-8 py-2.5 text-white bg-teal-700 font-bold shadow-md text-sm rounded-md hover:bg-teal-800 disabled:opacity-50 cursor-pointer w-full md:w-auto">
          {loading ? "PROCESSING BOOKING & PAYMENT..." : "CONFIRM & PAY NOW"}
        </button>
      </div>
    </form>
  );
}

export default function BForm() {
  return (
    <Elements stripe={stripePromise}>
      <BookingAndPaymentForm />
    </Elements>
  );
}
