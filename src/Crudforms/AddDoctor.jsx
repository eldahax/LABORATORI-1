import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

const initialFormState = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  speciality: "",
  license: "",
  experience: "",
  description: "",
  department: "",
};

function AddDoctorForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialFormState);
  const [certifications, setCertifications] = useState([]);
  const [deps, setDeps] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  const phoneRegex = /^[0-9+\s-]{6,20}$/; 

  useEffect(() => {
    fetch("http://localhost:5000/api/departments",{
      credentials:"include"
    })
      .then((res) => res.json())
      .then((data) => setDeps(data))
      .catch(() =>
        setAlert({ show: true, message: "Failed to load departments", type: "error" })
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: crypto.randomUUID(), 
        certification_name: "",
        certification_type: "",
        certification_date: "",
        organization: "",
      },
    ]);
  };

  const updateCertification = (id, field, value) => {
    setCertifications(
      certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const newErrors = {};
    if (!nameRegex.test(formData.name)) newErrors.name = "Invalid first name";
    if (!nameRegex.test(formData.lastname)) newErrors.lastname = "Invalid last name";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!passRegex.test(formData.password)) newErrors.password = "Weak password";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.speciality) newErrors.speciality = "Speciality required";
    if (!formData.license) newErrors.license = "License required";
    if (!formData.experience) newErrors.experience = "Experience required";
    if (!formData.description) newErrors.description = "Description required";
    if (!formData.department) newErrors.department = "Department required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const cleanCertifications = certifications.map(({ id, ...rest }) => rest);

      const res = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.name,
          last_name: formData.lastname,
          email: formData.email,
          phone_number: formData.phone,
          password: formData.password,
          specialization: formData.speciality,
          license_number: formData.license,
          years_experience: formData.experience,
          description: formData.description,
          department_name: formData.department,
          certifications: cleanCertifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ show: true, message: data.error || "Create failed", type: "error" });
        setLoading(false);
        return;
      }

      setFormData(initialFormState);
      setCertifications([]);
      setErrors({});
      setLoading(false);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setAlert({ show: true, message: "Server error", type: "error" });
      setLoading(false);
    }
  };

  return (
    <>
      <CustomAlert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert({ ...alert, show: false })} />

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative shadow-xl text-black">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">
          ✕
        </button>

        <h1 className="text-xl font-bold text-[#0F766E] border-b pb-2">Add Doctor Component</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block mb-1 font-bold text-black text-sm">First Name</label>
            <input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 font-bold text-black text-sm">Last Name</label>
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.lastname && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastname}</p>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="block mb-1 font-bold text-black text-sm">Email</label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 font-bold text-black text-sm">Phone</label>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 font-bold text-black text-sm">Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 font-bold text-black text-sm">License Number</label>
            <input type="text" name="license" placeholder="License" value={formData.license} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.license && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.license}</p>}
          </div>

          <div>
            <label className="block mb-1 font-bold text-black text-sm">Years Experience</label>
            <input type="number" name="experience" placeholder="Experience" value={formData.experience} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm" />
            {errors.experience && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.experience}</p>}
          </div>

          <div>
            <label className="block mb-1 font-bold text-black text-sm">Speciality</label>
            <select name="speciality" value={formData.speciality} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm bg-white">
              <option value="">Select Speciality</option>
              <option value="General Dentistry">General Dentistry</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Oral Surgery">Oral Surgery</option>
              <option value="Cosmetic">Cosmetic</option>
            </select>
            {errors.speciality && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.speciality}</p>}
          </div>

          <div>
            <label className="block mb-1 font-bold text-black text-sm">Department</label>
            <select name="department" value={formData.department} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm bg-white">
              <option value="">Select Department</option>
              {deps.map((d) => (
                <option key={d.department_id} value={d.department_name}>
                  {d.department_name}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.department}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-bold text-black text-sm">Description</label>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full border border-black rounded-lg px-3 py-2 text-sm h-20 resize-none" />
          {errors.description && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.description}</p>}
        </div>

        <div className="border-t pt-4 mt-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-[#0F766E]">Certifications</h3>
            <button type="button" onClick={addCertification} className="text-xs bg-teal-50 text-[#0F766E] border border-[#0F766E] px-3 py-1 rounded-md hover:bg-teal-100 transition font-bold cursor-pointer">
              + Add Certification
            </button>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative flex flex-col gap-2 shadow-sm">
                <button type="button" onClick={() => removeCertification(cert.id)} className="absolute top-2 right-3 text-red-500 font-bold text-sm hover:text-red-700 cursor-pointer">
                  ✕
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700 text-xs">Cert Name</label>
                    <input placeholder="Certification Name" value={cert.certification_name} onChange={(e) => updateCertification(cert.id, "certification_name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700 text-xs">Type</label>
                    <input placeholder="Type" value={cert.certification_type} onChange={(e) => updateCertification(cert.id, "certification_type", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700 text-xs">Date</label>
                    <input type="date" value={cert.certification_date} onChange={(e) => updateCertification(cert.id, "certification_date", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700 text-xs">Organization</label>
                    <input placeholder="Organization" value={cert.organization} onChange={(e) => updateCertification(cert.id, "organization", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 border-t pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2.5 border rounded-md font-semibold text-sm hover:bg-gray-50 transition cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-8 py-2.5 text-white bg-teal-700 font-bold shadow-md text-sm rounded-md hover:bg-teal-800 disabled:opacity-50 transition cursor-pointer">
            {loading ? "CREATING..." : "CREATE DOCTOR"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function AddDoctorModal({ show, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AddDoctorForm onClose={onClose} onSuccess={onSuccess} />
    </div>
  );
}