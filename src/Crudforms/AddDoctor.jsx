import { useState } from "react";

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

  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!nameRegex.test(name)) newErrors.name = "Invalid first name";
    if (!nameRegex.test(lastname)) newErrors.lastname = "Invalid last name";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!passRegex.test(password)) newErrors.password = "Weak password";
    if (!speciality) newErrors.speciality = "speciality is required";
    if (!license) newErrors.license = "lisence number is required";
    if (!experience) newErrors.experience = "years of experience are required";
    if (!description) newErrors.description = "description is required";
    if(!department)newErrors.department='department is required'

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
      department_name: department
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
  setErrors({});
} catch (err) {
  console.log(err);
  alert("Server error");
}
  

}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center">
          ADD DOCTOR
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="License Number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.license}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            >
              <option value="">Speciality</option>
              <option value="General Dentistry">General Dentistry</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Oral Surgery">Oral Surgery</option>
              <option value="Cosmetic">Cosmetic</option>
            </select>
            <p className="text-red-500 text-sm">{errors.speciality}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="number"
              placeholder="Years Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.experience}</p>
          </div>
        </div>

          <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
          <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
>
  <option value="">Choose a Department</option>
  <option value="General Dentistry">General Dentistry</option>
  <option value="Orthodontics">Orthodontics</option>
  <option value="Endodontics">Endodontics</option>
  <option value="Prosthodontics">Prosthodontics</option>
  <option value="Pediatric Dentistry">Pediatric Dentistry</option>
  <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
</select>
            <p className="text-red-500 text-sm">{errors.department}</p>
          </div>

          
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.description}</p>
        </div>

        <button
          type="submit"
          className="bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#134E4A]"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
}
