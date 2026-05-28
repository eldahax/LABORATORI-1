import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

export default function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const [user, setUser] = useState(null);

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const roles = user?.roles || [];

    const fetchPayments = () => {
        fetch("http://localhost:5000/api/payments", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setPayments(data))
            .catch(() =>
                setAlert({
                    show: true,
                    message: "Failed to load payments",
                    type: "error",
                })
            );
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/users/me", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch(() => { });

        fetchPayments();
    }, []);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
            <Navbar />

            <div className="min-h-screen flex w-full mt-[50px]">
                <Sidebar />

                <div className="w-3/4 p-10 ml-[25%]">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                            Payments
                        </h1>
                    </div>

                    <CustomAlert
                        show={alert.show}
                        message={alert.message}
                        type={alert.type}
                        onClose={() =>
                            setAlert((p) => ({ ...p, show: false }))
                        }
                    />

                    <table className="min-w-full text-left text-sm sm:text-base text-black">
                        <thead>
                            <tr className="border-b">

                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Treatment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(payments) &&
                                payments.map((pay) => (
                                    <tr
                                        key={pay.payment_id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4 pl-4">
                                            $ {pay.amount}
                                        </td>

                                        <td>{pay.payment_method}</td>

                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${pay.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : pay.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {pay.status}
                                            </span>
                                        </td>

                                        <td>
                                            {pay.payment_date
                                                ? new Date(
                                                    pay.payment_date
                                                ).toLocaleString()
                                                : "No date"}
                                        </td>

                                        <td>
                                            {pay.Invoice?.Appointment?.Doctor?.User?.first_name}{" "}
                                            {pay.Invoice?.Appointment?.Doctor?.User?.last_name}
                                        </td>

                                        <td>
                                            {pay.Invoice?.Appointment?.Patient?.User?.first_name}{" "}
                                            {pay.Invoice?.Appointment?.Patient?.User?.last_name}
                                        </td>

                                        <td>
                                            {pay.Invoice?.Appointment?.PatientTreatments?.[0]
                                                ?.Treatment?.treatment_name || "N/A"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}