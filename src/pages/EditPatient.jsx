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
    const getPatient = async () => {
      const res = await fetch(`http://localhost:5000/api/patients/${id}`);
      const data = await res.json();

      setForm({
        first_name: data.User?.first_name || "",
        last_name: data.User?.last_name || "",
        email: data.User?.email || "",
        phone_number: data.User?.phone_number || "",
        allergy_name: data.User?.allergy_name || "",
      });
    };

    getPatient();
  }, [id]);


  const handleChange = (e) => {
    if (e.target.name === "first_name") {
      setForm({
        first_name: e.target.value,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone_number,
        allergy_name: form.allergy_name,
      });
    }

    if (e.target.name === "last_name") {
      setForm({
        first_name: form.first_name,
        last_name: e.target.value,
        email: form.email,
        phone_number: form.phone_number,
        allergy_name: form.allergy_name,
      });
    }

    if (e.target.name === "email") {
      setForm({
        first_name: form.first_name,
        last_name: form.last_name,
        email: e.target.value,
        phone_number: form.phone_number,
        allergy_name: form.allergy_name,
      });
    }

    if (e.target.name === "phone_number") {
      setForm({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: e.target.value,
        allergy_name: form.allergy_name,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameErr("");
    setLastNameErr("");
    setEmailErr("");

    let hasError = false;

    if (!form.first_name || !nameRegex.test(form.first_name)) {
      setNameErr("Invalid first name");
      hasError = true;
    }

    if (!form.last_name || !nameRegex.test(form.last_name)) {
      setLastNameErr("Invalid last name");
      hasError = true;
    }

    if (!form.email || !emailRegex.test(form.email)) {
      setEmailErr("Invalid email");
      hasError = true;
    }

    if (hasError) return;

    const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error);
      return;
    }

    navigate("/patients");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white space-y-3">

        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}