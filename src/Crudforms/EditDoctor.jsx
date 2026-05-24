import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [certifications, setCertifications] = useState([]);

  const [allDepartments, setAllDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [docRes, depRes] = await Promise.all([
          fetch(`http://localhost:5000/api/doctors/${id}`, {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/departments", {
            credentials: "include",
          })
        ]);

        const doc = await docRes.json();
        const deps = await depRes.json();

        setName(doc.User?.first_name || "");
        setLastName(doc.User?.last_name || "");
        setEmail(doc.User?.email || "");
        setPhone(doc.User?.phone_number || "");
        setSpeciality(doc.specialization || "");
        setLicense(doc.license_number || "");
        setExperience(doc.years_experience || "");
        setDescription(doc.description || "");
        setDepartmentId(doc.Departments?.[0]?.department_id || "");
        setCertifications(Array.isArray(doc.Certifications) ? doc.Certifications : []);

        setAllDepartments(deps);
      } catch {
        setAlert({
          show: true,
          message: "Failed to load doctor data",
          type: "error",
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const validate = () => {
    const e = {};

    if (!name || name.length < 2) e.name = "Invalid name";
    if (!lastname || lastname.length < 2) e.lastname = "Invalid last name";
    if (!email.includes("@")) e.email = "Invalid email";
    if (!speciality) e.speciality = "Required";
    if (!license) e.license = "Required";
    if (!experience) e.experience = "Required";
    if (!departmentId) e.department = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name,
          last_name: lastname,
          email,
          phone_number: phone,
          specialization: speciality,
          license_number: license,
          years_experience: experience,
          description,
          department_id: Number(departmentId),
          certifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          show: true,
          message: data.error || "Update failed",
          type: "error",
        });
        setSaving(false);
        return;
      }

      setAlert({
        show: true,
        message: "Doctor updated successfully",
        type: "success",
      });

      setTimeout(() => navigate("/doctors"), 1000);
    } catch {
      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <CustomAlert
        {...alert}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center uppercase">
          Edit Doctor
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          placeholder="First Name"
        />
        <p className="text-red-500 text-sm">{errors.name}</p>

        <input
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 rounded"
          placeholder="Last Name"
        />
        <p className="text-red-500 text-sm">{errors.lastname}</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          placeholder="Email"
        />
        <p className="text-red-500 text-sm">{errors.email}</p>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
          placeholder="Phone"
        />

        <input
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="border p-2 rounded"
          placeholder="License"
        />
        <p className="text-red-500 text-sm">{errors.license}</p>

        <input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border p-2 rounded"
          placeholder="Experience"
        />
        <p className="text-red-500 text-sm">{errors.experience}</p>

        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Speciality</option>
          <option value="General Dentistry">General Dentistry</option>
          <option value="Orthodontics">Orthodontics</option>
          <option value="Oral Surgery">Oral Surgery</option>
          <option value="Cosmetic">Cosmetic</option>
        </select>

        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Department</option>
          {allDepartments.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.department_name}
            </option>
          ))}
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          placeholder="Description"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="w-1/2 border p-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-1/2 bg-[#0F766E] text-white p-2 rounded disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}