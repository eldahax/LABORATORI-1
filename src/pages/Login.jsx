import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const userregex = /^[A-Za-z0-9.-_!]+@[a-zA-Z-_]+\.[a-z]{3}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    setUserError("");
    setPassError("");

    if (username.trim() === "") {
      setUserError("Username is required");
      hasError = true;
    } else if (!userregex.test(username)) {
      setUserError("Username should be a valid email");
      hasError = true;
    }

    if (password.trim() === "") {
      setPassError("Password is required");
      hasError = true;
    } else if (!passRegex.test(password)) {
      setPassError(
        "Password must have uppercase, lowercase, number, and symbol",
      );
      hasError = true;
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen relative <font-serif">
      <div className=" w-full max-w-md p-8 rounded-xl    ">
        <h1 className="text-[36px] font-bold text-[#0F766E] text-center tracking-widest mb-6">
          LOG-IN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4" id="form">
          <div className="flex flex-col">
            <label for="username" class="mb-1 font-semibold text-[#134E4A]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUserError("");
              }}
              placeholder="Email"
              aria-live="polite"
              className={`border p-2 w-full rounded-[14px] ${
                userError ? "border-red-500 " : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm ">{userError}</p>
          </div>

          <div className="flex flex-col">
            <label for="password" class="mb-1 font-semibold text-[#134E4A]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPassError("");
              }}
              placeholder="Password"
              aria-live="polite"
              className={`border p-2 w-full rounded-[14px] ${
                passError ? "border-red-500 " : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm">{passError}</p>
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full bg-[#0F766E] text-white font-bold py-2 rounded-lg cursor-pointer  "
          />

          <p className="text-black text-center font-semibold">
            Don't have an account?
            <a href="" className="text-[#0F766E] font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
