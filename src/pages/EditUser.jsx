import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [nameErr, setNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          first_name: data.FirstName,
          last_name: data.LastName,
          email: data.Email,
        });
      })
      .catch(() => {});
  }, [id]);

  const handleChange = (e) => {
    setForm({
      first_name: form.FirstName,
      last_name: form.LastName,
      email: form.Email,
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

    await fetch(`http://localhost:5000/api/users/${id}`, {
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
        className="w-[450px] bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Edit User
        </h1>

        <div>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{nameErr}</p>
        </div>

        <div>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{lastNameErr}</p>
        </div>

        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border w-full rounded-lg"
          />
          <p className="text-red-500 text-sm">{emailErr}</p>
        </div>

        <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
          Update User
        </button>
      </form>
    </div>
  );
}