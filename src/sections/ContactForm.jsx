import { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [messageError, setMessageError] = useState("");

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^[0-9+\-\s]{8,15}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        setNameError("");
        setEmailError("");
        setPhoneError("");
        setMessageError("");

        if (name.trim() === "") {
            setNameError("Name is required");
            hasError = true;
        }
        if (email.trim() === "") {
            setEmailError("Email is required");
            hasError = true;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            hasError = true;
        }
        if (phone.trim() === "") {
            setPhoneError("Phone is required");
            hasError = true;
        }
        else if (!phoneRegex.test(phone)) {
            setPhoneError("Invalid phone number");
            hasError = true;
        }
        if (message.trim() === "") {
            setMessageError("Message is required");
            hasError = true;
        }

        if (!hasError) {
            alert("Message sent successfully!");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    };


    return (
        <div className="bg-white p-8 rounded-3xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 font-semibold text-[#134E4A]">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameError("");
                        }}
                        placeholder="Full Name"
                        className={`w-full px-4 py-3 rounded-xl border ${nameError ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#0F766E] outline-none`}
                    />
                    <span className="text-red-500 text-sm mt-1 block">{nameError}</span>
                </div>

                <div>
                    <label className="mb-1 font-semibold text-[#134E4A]">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                        placeholder="Email"
                        className={`w-full px-4 py-3 rounded-xl border ${emailError ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#0F766E] outline-none`}
                    />
                    <span className="text-red-500 text-sm mt-1 block">{emailError}</span>
                </div>
                <div>
                    <label className="mb-1 font-semibold text-[#134E4A]">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError("");
                        }}
                        placeholder="Phone"
                        className={`w-full px-4 py-3 rounded-xl border ${phoneError ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#0F766E] outline-none`}
                    />
                    <span className="text-red-500 text-sm mt-1 block">{phoneError}</span>
                </div>
                <div>
                    <label className="mb-1 font-semibold text-[#134E4A]">Message</label>
                    <textarea
                        rows="4"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setMessageError("");
                        }}
                        placeholder="Your message"
                        className={`w-full px-4 py-3 rounded-xl border ${messageError ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#0F766E] outline-none`}
                    ></textarea>
                    <span className="text-red-500 text-sm mt-1 block">{messageError}</span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#0F766E] text-white font-bold py-3 rounded-full hover:scale-105 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

