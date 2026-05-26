import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

const initialFormState = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  speciality: "",
  license: "",
  experience: "",
  description: "",
  departmentId: "",
};

function EditDoctorForm({ doctorId, onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialFormState);
  const [certifications, setCertifications] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (!doctorId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [docRes, depRes] = await Promise.all([
          fetch(`http://localhost:5000/api/doctors/${doctorId}`),
          fetch("http://localhost:5000/api/departments"),
        ]);

        if (!docRes.ok || !depRes.ok) throw new Error("Failed to load records");

        const doc = await docRes.json();
        const deps = await depRes.json();

        setFormData({
          name: doc.User?.first_name || "",
          lastname: doc.User?.last_name || "",
          email: doc.User?.email || "",
          phone: doc.User?.phone_number || "",
          speciality: doc.specialization || "",
          license: doc.license_number || "",
          experience: doc.years_experience || "",
          description: doc.description || "",
          departmentId: doc.Departments?.[0]?.department_id || "",
        });

        const syncedCerts = Array.isArray(doc.Certifications)
          ? doc.Certifications.map((c) => ({ ...c, id: c.certification_id || crypto.randomUUID() }))
          : [];
        setCertifications(syncedCerts);
        setAllDepartments(deps);
      } catch {
        setAlert({
          show: true,
          message: "Failed to load doctor profile data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

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

  const validate = () => {
    const e = {};
    if (!formData.name || formData.name.length < 2) e.name = "Invalid first name";
    if (!formData.lastname || formData.lastname.length < 2) e.lastname = "Invalid last name";
    if (!formData.email.includes("@")) e.email = "Invalid email structure";
    if (!formData.speciality) e.speciality = "Speciality field required";
    if (!formData.license) e.license = "License number required";
    if (!formData.experience) e.experience = "Experience required";
    if (!formData.departmentId) e.departmentId = "Department selection required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || saving) return;

    setSaving(true);

    try {
      const cleanCertifications = certifications.map(({ id, ...rest }) => rest);

      const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: "PUT",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.name,
          last_name: formData.lastname,
          email: formData.email,
          phone_number: formData.phone,
          specialization: formData.speciality,
          license_number: formData.license,
          years_experience: formData.experience,
          description: formData.description,
          department_id: Number(formData.departmentId),
          certifications: cleanCertifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Update cycle failed",
          type: "error",
        });
        setSaving(false);
        return;
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch {
      setAlert({
        show: true,
        message: "Server encountered error on submission",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <CustomAlert 
        show={alert.show} 
        message={alert.message} 
        type={alert.type} 
        onClose={() => setAlert({ ...alert, show: false })} 
      />

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl bg-white p-6 rounded-xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative shadow-xl text-black"
      >
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h1 className="text-xl font-bold text-[#0F766E] border-b pb-2">Edit Doctor Profile</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-medium">Loading profile records...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block mb-1 font-bold text-black text-sm">First Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="block mb-1 font-bold text-black text-sm">Last Name</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
                {errors.lastname && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastname}</p>}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="block mb-1 font-bold text-black text-sm">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label className="block mb-1 font-bold text-black text-sm">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
              </div>

              <div>
                <label className="block mb-1 font-bold text-black text-sm">License Number</label>
                <input type="text" name="license" value={formData.license} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
                {errors.license && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.license}</p>}
              </div>

              <div>
                <label className="block mb-1 font-bold text-black text-sm">Years Experience</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
                {errors.experience && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.experience}</p>}
              </div>

              <div>
                <label className="block mb-1 font-bold text-black text-sm">Speciality</label>
                <select name="speciality" value={formData.speciality} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]">
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
                <select name="departmentId" value={formData.departmentId} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]">
                  <option value="">Select Department</option>
                  {allDepartments.map((d) => (
                    <option key={d.department_id} value={d.department_id}>
                      {d.department_name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.departmentId}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-bold text-black text-sm">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E]" />
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
                        <input placeholder="Certification Name" value={cert.certification_name || ""} onChange={(e) => updateCertification(cert.id, "certification_name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-gray-700 text-xs">Type</label>
                        <input placeholder="Type" value={cert.certification_type || ""} onChange={(e) => updateCertification(cert.id, "certification_type", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-gray-700 text-xs">Date</label>
                        <input type="date" value={cert.certification_date ? cert.certification_date.split("T")[0] : ""} onChange={(e) => updateCertification(cert.id, "certification_date", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-gray-700 text-xs">Organization</label>
                        <input placeholder="Organization" value={cert.organization || ""} onChange={(e) => updateCertification(cert.id, "organization", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white" />
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
              <button type="submit" disabled={saving} className="px-8 py-2.5 text-white bg-teal-700 font-bold shadow-md text-sm rounded-md hover:bg-teal-800 disabled:opacity-50 transition cursor-pointer">
                {saving ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default function EditDoctorModal({ show, doctorId, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <EditDoctorForm doctorId={doctorId} onClose={onClose} onSuccess={onSuccess} />
    </div>
  );
}