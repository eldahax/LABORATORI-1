import { useState } from "react";

import {Link} from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]{6,10}$/;
  const userregex = /^[A-Za-z0-9!./_]{5,12}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setNameErr("");
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmErr("");
    
    let hasError = false;


    if (name.trim() === "") {
      setNameErr("Name is required");
      hasError = true;
    } else if (!nameRegex.test(name)) {
      setNameErr("Name should only contain letters (6-10 characters)");
      hasError = true;
    }

 
    if (username.trim() === "") {
      setUsernameErr("Username is required");
      hasError = true;
    } else if (!userregex.test(username)) {
      setUsernameErr("Username should be 5-12 characters and can contain letters, numbers, !./_");
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
        "Password must have uppercase, lowercase, number, and symbol (8-20 characters)"
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
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className='text-red-500 pl-[4px] font-sm'>{nameErr}</p>
          </div>

          <div className="flex flex-col">
            <input
              name="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border-[2px] border-[#0F766E] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
            />
            <p className='text-red-500 pl-[4px] font-sm'>{usernameErr}</p>
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
            <p className='text-red-500 pl-[4px] font-sm'>{emailErr}</p>
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
            <p className='text-red-500 pl-[4px] font-sm'>{passwordErr}</p>
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
            <p className='text-red-500 pl-[4px] font-sm'>{confirmErr}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-[#134E4A] transition-colors"
          >
            Sign Up
          </button>

          <p className="text-black text-center font-semibold">
            Already have an account?
            <Link className="text-[#0F766E] font-bold hover:underline ml-1" to="/Login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}