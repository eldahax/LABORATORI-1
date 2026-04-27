import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDoctor() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        setName(data.User?.first_name || "");
        setLastName(data.User?.last_name || "");
        setEmail(data.User?.email || "");
        setPhone(data.User?.phone_number || "");
        setSpeciality(data.specialization || "");
        setLicense(data.license_number || "");
        setExperience(data.years_experience || "");
        setDescription(data.description || "");
       
        setDepartment(data.Departments?.[0]?.department_name || "");
      })
      .catch((err) => console.log("Error fetching doctor:", err));
  }, [id]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!nameRegex.test(name)) newErrors.name = "Invalid first name";
    if (!nameRegex.test(lastname)) newErrors.lastname = "Invalid last name";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!speciality) newErrors.speciality = "Speciality is required";
    if (!license) newErrors.license = "License number is required";
    if (!experience) newErrors.experience = "Experience is required";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
       
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name,
          last_name: lastname,
          email: email,
          phone_number: phone,
          specialization: speciality,
          license_number: license,
          years_experience: experience,
          description: description
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update failed");
        return;
      }

      alert("Doctor updated successfully");
      navigate("/Staff"); 
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center uppercase">
          Edit Doctor #{id}
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">License Number</label>
            <input
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.license}</p>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">Years of Experience</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2"
            />
            <p className="text-red-500 text-sm">{errors.experience}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-500 ml-1">Speciality</label>
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

         
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 ml-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-[#0F766E] rounded-lg px-3 py-2 h-24"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="w-1/2 border-2 border-gray-300 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#134E4A]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}