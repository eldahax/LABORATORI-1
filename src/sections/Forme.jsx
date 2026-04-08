import { useState } from "react";

const Forme = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [role, setRole] = useState("");

    const [errors, setErrors] = useState({});

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^[0-9+\-\s]{8,15}$/;
    const postalRegex = /^[0-9]{3,10}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (fullName.trim() === "") {
            newErrors.fullName = "Full Name is required";
        }

        if (email.trim() === "") {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (phone.trim() === "") {
            newErrors.phone = "Phone is required";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Invalid phone number";
        }


        if (postalCode.trim() !== "" && !postalRegex.test(postalCode)) {
            newErrors.postalCode = "Invalid postal code";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert("Saved successfully!");

            setFullName("");
            setEmail("");
            setAddress("");
            setPhone("");
            setDob("");
            setLocation("");
            setPostalCode("");
            setRole("");
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 w-full">


            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        setErrors({});
                    }}
                    className={`w-full bg-gray-100 p-4 rounded-lg outline-none ${errors.fullName ? "border border-red-500" : ""
                        }`}
                />
                <span className="text-red-500 text-sm">{errors.fullName}</span>
            </div>


            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({});
                    }}
                    className={`w-full bg-gray-100 p-4 rounded-lg outline-none ${errors.email ? "border border-red-500" : ""
                        }`}
                />
                <span className="text-red-500 text-sm">{errors.email}</span>
            </div>


            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-100 p-4 rounded-lg outline-none"
            />

            <div className="flex gap-5">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setErrors({});
                        }}
                        className={`w-full bg-gray-100 p-4 rounded-lg outline-none ${errors.phone ? "border border-red-500" : ""
                            }`}
                    />
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                </div>

                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                />
            </div>


            <div className="flex gap-5">
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                >
                    <option value="">Location</option>
                    <option>Pejë</option>
                    <option>Prishtinë</option>
                    <option>Gjakovë</option>
                    <option>Prizren</option>
                    <option>Gjilan</option>
                    <option>Ferizaj</option>
                </select>

                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                            setErrors({});
                        }}
                        className={`w-full bg-gray-100 p-4 rounded-lg outline-none ${errors.postalCode ? "border border-red-500" : ""
                            }`}
                    />
                    <span className="text-red-500 text-sm">{errors.postalCode}</span>
                </div>
            </div>


            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-100 p-4 rounded-lg outline-none"
            >
                <option value="">Dental role</option>
                <option>General Dentistry</option>
                <option>Orthodontics</option>
                <option>Oral Surgery</option>
                <option>Endodontics</option>
                <option>Nurse</option>
                <option>Receptionist</option>
            </select>

            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    className="border border-gray-400 text-gray-700 px-8 py-3 rounded-lg"
                >
                    Discard
                </button>

                <button
                    type="submit"
                    className="bg-teal-700 text-white px-8 py-3 rounded-lg"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default Forme;