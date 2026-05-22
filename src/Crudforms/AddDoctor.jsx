import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddDoc() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [deps, setDeps] = useState([]);

  const [certifications, setCertifications] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  useEffect(() => {
    fetch("http://localhost:5000/api/departments")
      .then((res) => res.json())
      .then((data) => setDeps(data))
      .catch(() =>
        setAlert({
          show: true,
          message: "Failed to load departments",
          type: "error",
        })
      );
  }, []);

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        certification_name: "",
        certification_type: "",
        certification_date: "",
        organization: "",
      },
    ]);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const newErrors = {};

    if (!nameRegex.test(name)) newErrors.name = "Invalid first name";
    if (!nameRegex.test(lastname)) newErrors.lastname = "Invalid last name";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!passRegex.test(password)) newErrors.password = "Weak password";
    if (!speciality) newErrors.speciality = "Speciality required";
    if (!license) newErrors.license = "License required";
    if (!experience) newErrors.experience = "Experience required";
    if (!description) newErrors.description = "Description required";
    if (!department) newErrors.department = "Department required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name,
          last_name: lastname,
          email,
          phone_number: phone,
          password,
          specialization: speciality,
          license_number: license,
          years_experience: experience,
          description,
          department_name: department,
          certifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Create failed",
          type: "error",
        });
        setLoading(false);
        return;
      }

      setAlert({
        show: true,
        message: "Doctor created successfully",
        type: "success",
      });

      setName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setSpeciality("");
      setLicense("");
      setExperience("");
      setDescription("");
      setDepartment("");
      setCertifications([]);
      setErrors({});

      setLoading(false);
    } catch (err) {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ ...alert, show: false })}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center">
          ADD DOCTOR
        </h1>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <input
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          </div>
        </div>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.email}</p>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.password}</p>

        <input
          placeholder="License"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Speciality</option>
          <option value="General Dentistry">General Dentistry</option>
          <option value="Orthodontics">Orthodontics</option>
          <option value="Oral Surgery">Oral Surgery</option>
          <option value="Cosmetic">Cosmetic</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Department</option>
          {deps.map((d) => (
            <option key={d.department_id} value={d.department_name}>
              {d.department_name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          disabled={loading}
          className="bg-[#0F766E] text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Create Doctor"}
        </button>
      </form>
    </div>
  );
}