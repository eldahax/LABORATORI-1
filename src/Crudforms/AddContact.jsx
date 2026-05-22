import { useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function AddContact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z\s]{3,30}$/;

  const showAlert = (message, type = "success") => {
    setAlert({
      show: true,
      message,
      type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!nameRegex.test(fullname))
      newErrors.fullname = "Invalid full name";

    if (!emailRegex.test(email))
      newErrors.email = "Invalid email";

    if (!message)
      newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            phone_number,
            message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.error || "Failed to send message", "error");
        return;
      }

      showAlert("Message sent successfully", "success");

      setFullname("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
    } catch (err) {
      console.log(err);
      showAlert("Server error", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#0F766E] text-center">
          CONTACT US
        </h1>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />
          <p className="text-red-500 text-sm">
            {errors.fullname}
          </p>
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />
          <p className="text-red-500 text-sm">
            {errors.email}
          </p>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Phone (optional)"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-[#0F766E] rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-[#0F766E] rounded-lg px-3 py-2 h-24"
          />
          <p className="text-red-500 text-sm">
            {errors.message}
          </p>
        </div>

        <button
          type="submit"
          className="bg-[#0F766E] text-white py-2 rounded-lg font-bold hover:bg-[#134E4A]"
        >
          Send Message
        </button>
      </form>

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert({
            show: false,
            message: "",
            type: "success",
          })
        }
      />
    </div>
  );
}