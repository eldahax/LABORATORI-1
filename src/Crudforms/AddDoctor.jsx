import { useState, useEffect } from "react";

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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const addCertification = () => {
    const updated = certifications.slice();
    updated.push({
      certification_name: "",
      certification_type: "",
      certification_date: "",
      organization: "",
    });
    setCertifications(updated);
  };

  const updateCertification = (index, field, value) => {
    const updated = certifications.slice();
    updated[index][field] = value;
    setCertifications(updated);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchD = async () => {
      const res = await fetch("http://localhost:5000/api/departments");
      const data = await res.json();
      setDeps(data);
    };
    fetchD();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!nameRegex.test(name)) newErrors.name = "Invalid first name";
    if (!nameRegex.test(lastname)) newErrors.lastname = "Invalid last name";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!passRegex.test(password)) newErrors.password = "Weak password";
    if (!speciality) newErrors.speciality = "speciality is required";
    if (!license) newErrors.license = "license number is required";
    if (!experience) newErrors.experience = "experience required";
    if (!description) newErrors.description = "description required";
    if (!department) newErrors.department = "department required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name,
          last_name: lastname,
          email: email,
          phone_number: phone,
          password: password,
          specialization: speciality,
          license_number: license,
          years_experience: experience,
          description: description,
          department_name: department,
          certifications: certifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Doctor created successfully");

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
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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

        <div className="flex gap-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            placeholder="License"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={department}
            onChange={(e) => setSpeciality(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a Speciality</option>

            {deps.map((d) => (
              <option value={d.department_name} key={d.department_id}>
                {d.department_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Department</option>

          {deps.map((d) => (
            <option value={d.department_name} key={d.department_id}>
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

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="font-bold text-[#0F766E]">Certifications</h2>

            <button
              type="button"
              onClick={addCertification}
              className="bg-[#0F766E] text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>

          {certifications.map((c, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <input
                placeholder="Name"
                value={c.certification_name}
                onChange={(e) =>
                  updateCertification(
                    index,
                    "certification_name",
                    e.target.value,
                  )
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Type"
                value={c.certification_type}
                onChange={(e) =>
                  updateCertification(
                    index,
                    "certification_type",
                    e.target.value,
                  )
                }
                className="border p-2 rounded"
              />

              <input
                type="date"
                value={c.certification_date}
                onChange={(e) =>
                  updateCertification(
                    index,
                    "certification_date",
                    e.target.value,
                  )
                }
                className="border p-2 rounded"
              />

              <input
                placeholder="Organization"
                value={c.organization}
                onChange={(e) =>
                  updateCertification(index, "organization", e.target.value)
                }
                className="border p-2 rounded"
              />

              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="bg-red-500 text-white rounded px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button className="bg-[#0F766E] text-white p-2 rounded">
          Create Doctor
        </button>
      </form>
    </div>
  );
}
