import { useState } from "react";

import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const [signupErr, setSignupErr]=useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [lastNameErr, setLastNameerr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{3,15}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameErr("");
    setLastNameerr("");

    setEmailErr("");
    setPasswordErr("");
    setConfirmErr("");

    let hasError = false;

    if (name.trim() === "") {
      setNameErr("Name is required");
      hasError = true;
    } else if (!nameRegex.test(name)) {
      setNameErr("Name should only contain letters (3-15 characters)");
      hasError = true;
    }
    if (lastname.trim() === "") {
      setLastNameerr("Last Name is required");
      hasError = true;
    } else if (!nameRegex.test(lastname)) {
      setLastNameerr("Last Name should only contain letters (6-10 characters)");
      hasError = true;
    }

    if (email.trim() === "") {
      setEmailErr("Email is required");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailErr("Please enter a valid email address");
      hasError = true;
    }

    if (password.trim() === "") {
      setPasswordErr("Password is required");
      hasError = true;
    } else if (!passRegex.test(password)) {
      setPasswordErr(
        "Password must have uppercase, lowercase, number, and symbol (8-20 characters)",
      );
      hasError = true;
    }

    if (confirm.trim() === "") {
      setConfirmErr("Please confirm your password");
      hasError = true;
    } else if (password !== confirm) {
      setConfirmErr("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: name,
          last_name: lastname,
          email: email,
          phone_number: phone,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
       setSignupErr(data.error)
        return;
      }

      alert("User created successfully!");
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full max-w-md p-8 rounded-xl">
        <h1 className="text-[36px] font-bold text-[#0F766E] text-center tracking-widest mb-5">
          SIGN-UP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col pt-4">
            <input
              name="name"
              type="text"
              placeholder="first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 pl-[4px] font-sm">{nameErr}</p>
          </div>

          <div className="flex flex-col ">
            <input
              name="name"
              type="text"
              placeholder="last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 pl-[4px] font-sm">{lastNameErr}</p>
          </div>

          <div className="flex flex-col">
            <input
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 pl-[4px] font-sm">{emailErr}</p>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
          </div>

          <div className="flex flex-col">
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 pl-[4px] font-sm">{passwordErr}</p>
          </div>

          <div className="flex flex-col">
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className="text-red-500 pl-[4px] font-sm">{confirmErr}</p>
          </div>
          {signupErr && (
            <p className="text-red-500 text-center font-semibold">
              {signupErr}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-[#134E4A] transition-colors"
          >
            Sign Up
          </button>

          <p className="text-black text-center font-semibold">
            Already have an account?
            <Link
              className="text-[#0F766E] font-bold hover:underline ml-1"
              to="/Login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}