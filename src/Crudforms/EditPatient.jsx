import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    allergy_name: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [nameErr, setNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          first_name: data?.User?.first_name || "",
          last_name: data?.User?.last_name || "",
          email: data?.User?.email || "",
          phone_number: data?.User?.phone_number || "",
          allergy_name: data?.PatientAllergies?.[0]?.allergy_name || "",
        });
      })
      .catch(() => {
        setAlert({
          show: true,
          message: "Failed to load patient",
          type: "error",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

    try {
      const res = await fetch(
        `http://localhost:5000/api/patients/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json().catch(() => ({}));

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
        message: "Patient updated successfully",
        type: "success",
      });

      setTimeout(() => {
        navigate("/patients");
      }, 1200);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert({ show: false, message: "", type: "success" })
        }
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white rounded-2xl space-y-2 p-6"
      >
        <h1 className="text-3xl font-bold text-[#134E4A] text-center">
          Edit Patient
        </h1>

        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
          placeholder="First Name"
        />
        <p className="text-red-500 text-sm h-5">{nameErr}</p>

        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
          placeholder="Last Name"
        />
        <p className="text-red-500 text-sm h-5">{lastNameErr}</p>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
          placeholder="Email"
        />
        <p className="text-red-500 text-sm h-5">{emailErr}</p>

        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
          placeholder="Phone"
        />

        <input
          name="allergy_name"
          value={form.allergy_name}
          onChange={handleChange}
          className="p-3 border w-full rounded-lg"
          placeholder="Allergy"
        />

        <button className="w-full bg-[#0F766E] text-white py-3 rounded-lg font-semibold">
          Update Patient
        </button>
      </form>
    </div>
  );
}