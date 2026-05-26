import { useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";

function EditUserForm({ userId, onClose, onSuccess }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [nameErr, setNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Could not retrieve user data");
        const data = await res.json();
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
        });
      } catch {
        setAlert({
          show: true,
          message: "Failed to load user records.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

    if (hasError || saving) return;

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
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
        message: "Server error encountered on submission",
        type: "error",
      });
      setSaving(false);
    }
  };

  return (
    <>
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((p) => ({ ...p, show: false }))}
      />

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white p-8 rounded-2xl relative flex flex-col gap-4 text-black shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer transition"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-[#134E4A] text-center border-b pb-2">
          Edit User Profile
        </h1>

        {loading ? (
          <div className="text-center py-8 text-gray-500 font-medium">
            Loading user information...
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">First Name</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {nameErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{nameErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Last Name</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {lastNameErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{lastNameErr}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {emailErr && <p className="text-red-500 text-xs font-semibold mt-0.5">{emailErr}</p>}
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-1/2 bg-[#0F766E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-teal-800 transition shadow-md disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Updating..." : "Update User"}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default function EditUserModal({ show, userId, onClose, onSuccess }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <EditUserForm userId={userId} onClose={onClose} onSuccess={onSuccess} />
    </div>
  );
}