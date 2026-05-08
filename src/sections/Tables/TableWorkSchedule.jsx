import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";

export default function TableWorkSchedule() {

    const [workSchedules, setWorkSchedules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/work-schedules")
            .then((res) => res.json())
            .then((data) => setWorkSchedules(data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = async (work_schedule_id) => {

        if (!window.confirm("Are you sure?")) return;

        try {
            const res = await fetch(
                `http://localhost:5000/api/work-schedules/${work_schedule_id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                setWorkSchedules((prev) =>
                    prev.filter(
                        (ws) => ws.work_schedule_id !== work_schedule_id
                    )
                );
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">

            <Navbar />

            <div className="min-h-screen">

                <div className="flex w-full min-h-screen mt-[50px]">

                    <Sidebar />

                    <div className="w-3/4 p-10 ml-[25%]">

                        <TableCard />

                        <div className="flex justify-between items-center mb-6">

                            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
                                Work Schedules
                            </h1>

                            <button
                                onClick={() => navigate("/add-work-schedule")}
                                className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D665F] transition-colors"
                            >
                                + Add Work Schedule
                            </button>

                        </div>

                        <table className="min-w-full text-left text-sm sm:text-base text-black">

                            <thead>
                                <tr className="border-b">

                                    <th className="py-3 pl-4">
                                        ID
                                    </th>

                                    <th className="py-2">
                                        Doctor ID
                                    </th>

                                    <th>
                                        Day
                                    </th>

                                    <th>
                                        Start Time
                                    </th>

                                    <th>
                                        End Time
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {workSchedules.map((ws) => (

                                    <tr
                                        key={ws.work_schedule_id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="py-4 pl-4">
                                            {ws.work_schedule_id}
                                        </td>

                                        <td>
                                            {ws.doctor_id}
                                        </td>

                                        <td>
                                            {ws.schedule_day}
                                        </td>

                                        <td>
                                            {ws.start_time}
                                        </td>

                                        <td>
                                            {ws.end_time}
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    ws.status === "active"
                                                        ? "text-green-600 font-semibold"
                                                        : "text-red-500 font-semibold"
                                                }
                                            >
                                                {ws.status}
                                            </span>
                                        </td>

                                        <td className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    handleDelete(ws.work_schedule_id)
                                                }
                                                className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/work-schedules/edit/${ws.work_schedule_id}`
                                                    )
                                                }
                                                className="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg"
                                            >
                                                Update
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}