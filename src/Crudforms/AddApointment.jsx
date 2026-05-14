import { useEffect, useState } from "react";

export default function BForm() {
  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const [nameError, setNameError] = useState("");
  const [docError, setDocError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [signupErr, setSignupErr] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    const fetchTreatments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/treatments");
        const data = await res.json();
        setTreatments(data);
      } catch (err) {
        console.error("Failed to fetch treatments:", err);
      }
    };

    fetchDoctors();
    fetchTreatments();
  }, []);

  const nameRegex = /^[A-Za-z\s'-]{5,30}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^[0-9+\-\s]{8,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setNameError("");
    setDocError("");
    setReasonError("");
    setEmailError("");
    setPhoneError("");
    setDateError("");
    setSignupErr("");

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

    if (reason === "") {
      setReasonError("Please select a treatment");
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

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          doctor: doc,
          email: email,
          phone_number: phone,
          appointment_date_time: date,
          description: reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSignupErr(data.error || "Something went wrong");
        return;
      }

      alert("Appointment created successfully");

      setName("");
      setDoc("");
      setReason("");
      setEmail("");
      setPhone("");
      setDate("");
    } catch (err) {
      console.error(err);
      setSignupErr("Failed to connect to the server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center a flex-wrap mt-[60px]"
    >
      <div className="w-full sm:w-[300px] md:w-[60%] p-2 mx-auto">
        <h1 className="text-center text-[30px] font-bold mb-[5px]">ADD APOINTMENT</h1>
        <div className="flex flex-col  w-[70%] mx-auto">
          <label className=" mb-1 font-bold text-black">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            className={`w-full border-2 rounded-lg px-3 py-2 mx-auto ${
              nameError ? "border-red-500" : "border-black"
            }`}
          />

          <span className="text-red-600 text-[14px]">
            {nameError}
          </span>
        </div>

        <div className="flex flex-col mt-3 w-[70%] mx-auto">
          <label className="mb-1 font-bold text-black">
            Doctor
          </label>

          <select
            value={doc}
            onChange={(e) => {
              setDoc(e.target.value);
              setDocError("");
            }}
    className={`w-full border-2 rounded-lg px-3 py-2 ${
              docError ? "border-red-500" : "border-black"
            }`}
          >
            <option value="">Select a doctor</option>

            {doctors.map((d) => (
              <option
                key={d.doctor_id}
                value={d.doctor_id}
              >
                {d.User?.first_name} {d.User?.last_name}
              </option>
            ))}
          </select>

          <span className="text-red-500 text-[14px]">
            {docError}
          </span>
        </div>
      </div>

      <div className="w-full  sm:w-[300px] md:w-[60%] p-2">
        <div className="flex flex-col w-[70%] mx-auto">
          <label className="mb-1 font-bold text-black">
            Email
          </label>

          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={`w-full  border-2 rounded-lg px-3 py-2 ${
              emailError ? "border-red-500" : "border-black"
            }`}
          />

          <span className="text-red-500 text-[14px]">
            {emailError}
          </span>
        </div>

        <div className="flex flex-col mt-3 w-[70%] mx-auto">
          <label className="mb-1 font-semibold text-black">
            Phone Number
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            className={`w-full  border-2 rounded-lg px-3 py-2 ${
              phoneError ? "border-red-500" : "border-black"
            }`}
          />

          <span className="text-red-500 text-[14px]">
            {phoneError}
          </span>
        </div>
      </div>

      <div className="w-full  sm:w-[300px] md:w-[60%] p-2 ">
        <div className="flex flex-col w-[70%] mx-auto">
          <label className="mb-1 font-bold text-black">
            Date and Time
          </label>

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setDateError("");
            }}
            className={`w-full  border-2 rounded-lg px-3 py-2  ${
              dateError ? "border-red-500" : "border-black"
            }`}
          />

          <span className="text-red-500 text-[14px]">
            {dateError}
          </span>
        </div>

        <div className="flex flex-col mt-3 w-[70%] mx-auto">
          <label className="mb-1 font-bold text-black">
            Treatment
          </label>

          <select
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setReasonError("");
            }}
            className={`w-full  border-2 rounded-lg px-3 py-2 ${
              reasonError ? "border-red-500" : "border-black"
            }`}
          >
            <option value="">Select a treatment</option>

            {treatments.map((t) => (
              <option
                key={t.treatment_id}
                value={t.treatment_name}
              >
                {t.treatment_name}
              </option>
            ))}
          </select>

          <span className="text-red-500 text-[14px]">
            {reasonError}
          </span>
        </div>

        {signupErr && (
          <p className="text-red-600 text-center mt-3">
            {signupErr}
          </p>
        )}

        <div className="w-full text-center mt-4">
          <input
            type="submit"
            value="BOOK"
            className="px-8 py-2 text-white bg-teal-700 font-bold shadow-md text-sm cursor-pointer rounded-md"
          />
        </div>
      </div>
    </form>
  );
}