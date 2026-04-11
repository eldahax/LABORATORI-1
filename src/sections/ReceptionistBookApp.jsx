import { useState } from "react";

export default function ReceptionistBookApp() {
  const [mode, setMode] = useState("create");

  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const [nameError, setNameError] = useState("");
  const [docError, setDocError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [reasonError, setReasonError] = useState("");

  const nameRegex = /^[A-Za-z\s]{5,30}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^[0-9+\-\s]{8,15}$/;
  const reasonRegex = /^[a-zA-Z0-9._/]{10,100}$/;

  const resetErrors = () => {
    setNameError("");
    setDocError("");
    setEmailError("");
    setPhoneError("");
    setDateError("");
    setReasonError("");
  };

  const validateForm = () => {
    let hasError = false;
    resetErrors();

    if (name.trim() === "") {
      setNameError("Name is required");
      hasError = true;
    } else if (!nameRegex.test(name)) {
      setNameError("Only letters, 5–30 characters");
      hasError = true;
    }

    if (doc === "") {
      setDocError("Please select a doctor");
      hasError = true;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      hasError = true;
    }

    if (phone.trim() === "") {
      setPhoneError("Phone is required");
      hasError = true;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number");
      hasError = true;
    }

    if (date === "") {
      setDateError("Please select date and time");
      hasError = true;
    } else {
      const selectedDate = new Date(date);
      const now = new Date();

      if (selectedDate < now) {
        setDateError("Cannot select past date");
        hasError = true;
      } else if (selectedDate.getDay() === 0) {
        setDateError("Closed on Sunday");
        hasError = true;
      } else if (
        selectedDate.getHours() < 9 ||
        selectedDate.getHours() >= 17
      ) {
        setDateError("Working hours: 09:00 - 17:00");
        hasError = true;
      }
    }

    if (reason.trim() === "") {
      setReasonError("Reason is required");
      hasError = true;
    } else if (!reasonRegex.test(reason)) {
      setReasonError("Reason must be 10–100 characters");
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (mode === "create") {
      console.log("Creating appointment:", {
        name,
        doc,
        email,
        phone,
        date,
        reason,
      });
    } else if (mode === "updateUser") {
      console.log("Updating user:", {
        name,
        email,
        phone,
      });
    } else if (mode === "updateAppointment") {
      console.log("Updating appointment:", {
        name,
        doc,
        date,
        reason,
      });
    }

    alert("Success!");
  };

  return (
    <div className="flex flex-col items-center">

      <div className="mb-6 flex gap-3">
        <button onClick={() => setMode("create")} className="bg-teal-600 text-white px-4 py-2 rounded">
          New Appointment
        </button>
        <button onClick={() => setMode("updateUser")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Update User
        </button>
        <button onClick={() => setMode("updateAppointment")} className="bg-orange-600 text-white px-4 py-2 rounded">
          Update Appointment
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[60%] flex justify-center items-center flex-wrap"
      >
        <div className="w-full sm:w-[300px] md:w-[60%] p-2">
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-black">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${nameError ? "border-red-500" : "border-black"
                }`}
            />
            <span className="text-red-600 text-[14px]">{nameError}</span>
          </div>

          <div className="flex flex-col mt-3">
            <label className="mb-1 font-bold text-black">Doctor</label>
            <select
              value={doc}
              onChange={(e) => {
                setDoc(e.target.value);
                setDocError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${docError ? "border-red-500" : "border-black"
                }`}
            >
              <option value="">Select a doctor</option>
              <option value="Shpend Agusholli">Dr. Shpend Agusholli</option>
              <option value="Valza Agusholli">Dr. Valza Agusholli</option>
              <option value="Ledion Agusholli">Dr. Ledion Agusholli</option>
              <option value="Erisa Lamaxhem">Dr. Erisa Lamaxhema</option>
              <option value="Altea Gora">Dr. Altea Gora</option>
              <option value="Roni Lleshi">Dr. Roni Lleshi</option>
              <option value="Riad Devolli">Dr. Riad Devolli</option>
            </select>
            <span className="text-red-500 text-[14px]">{docError}</span>
          </div>
        </div>

        <div className="w-full sm:w-[300px] md:w-[60%] p-2">
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-black">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${emailError ? "border-red-500" : "border-black"
                }`}
            />
            <span className="text-red-500 text-[14px]">{emailError}</span>
          </div>

          <div className="flex flex-col mt-3">
            <label className="mb-1 font-semibold text-black">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${phoneError ? "border-red-500" : "border-black"
                }`}
            />
            <span className="text-red-500 text-[14px]">{phoneError}</span>
          </div>
        </div>

        <div className="w-full sm:w-[300px] md:w-[60%] p-2">
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-black">Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${dateError ? "border-red-500" : "border-black"
                }`}
            />
            <span className="text-red-500 text-[14px]">{dateError}</span>
          </div>

          <div className="flex flex-col mt-3">
            <label className="mb-1 font-bold text-black">Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setReasonError("");
              }}
              className={`w-full border-2 rounded-lg px-3 py-2 ${reasonError ? "border-red-500" : "border-black"
                }`}
            />
            <span className="text-red-500 text-[14px]">{reasonError}</span>
          </div>

          <div className="w-full text-center mt-4">
            <input
              type="submit"
              value={
                mode === "create"
                  ? "BOOK"
                  : mode === "updateUser"
                    ? "UPDATE USER"
                    : "UPDATE APPOINTMENT"
              }
              className="px-8 py-2 text-white bg-teal-700 font-bold rounded-md cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
}