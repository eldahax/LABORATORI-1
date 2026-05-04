import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    allergy_name: ""
  });

  const [nameErr, setNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        setForm({
          first_name: data.User?.first_name || "",
          last_name: data.User?.last_name || "",
          email: data.User?.email || "",
          phone_number: data.User?.phone_number || "",
          allergy_name: data.PatientAllergies[0].allergy_name 
        });
      })
    .catch(() => {});
  }, [id]);

  const handleChange = (e) => {
    setForm({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone_number: form.phone_number,
      allergy_name: form.allergy_name,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameErr("");
    setLastNameErr("");
    setEmailErr("");

    let hasError = false;

    if (!form.first_name.trim()) {
      setNameErr("First name is required");
      hasError = true;
    } else if (!nameRegex.test(form.first_name)) {
      setNameErr("First name must be 3-15 letters only");
      hasError = true;
    }

    if (!form.last_name.trim()) {
      setLastNameErr("Last name is required");
      hasError = true;
    } else if (!nameRegex.test(form.last_name)) {
      setLastNameErr("Last name must be 3-15 letters only");
      hasError = true;
    }

    if (!form.email.trim()) {
      setEmailErr("Email is required");
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      setEmailErr("Invalid email format");
      hasError = true;
    }

    if (hasError) return;

    await fetch(`http://localhost:5000/api/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/Staff");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white rounded-2xl  space-y-2"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Edit Patient
        </h1>

        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <p className="text-red-500 text-sm h-5">{nameErr}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <p className="text-red-500 text-sm h-5">{lastNameErr}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <p className="text-red-500 text-sm h-5">{emailErr}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <div className="h-5"></div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Allergies</label>
          <input
            name="allergy_name"
            value={form.allergy_name}
            onChange={handleChange}
            placeholder="Allergies"
            className="p-3 border w-full rounded-lg focus:ring-2 focus:ring-[#0F766E] outline-none"
          />
          <div className="h-5"></div>
        </div>

        <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold hover:bg-[#134E4A] transition-colors">
          Update Patient
        </button>
      </form>
    </div>
  );
}