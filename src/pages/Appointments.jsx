import AppointmentCard from "../../../LABORATORI-1/src/sections/AppointmentCard";
import Navbar from "../components/Navbar";
export default function Appointment() {


    return (
        <>
        <Navbar></Navbar>

            <section className="w-[100%] min-h-[100vh]flex justify-between items-center flex-wrap md:flex-col  p-10 mt-[140px]">

                <div className="w-full h-full">
                    <h2 className="text-[40px] tracking-widest text-center font-bold text-gray-400 mb-[20px]">APPOINTMENTS</h2>
                    <div className="flex justify-center items-center w-[100] h-full flex-wrap gap-8">


                        <AppointmentCard></AppointmentCard>
                        <AppointmentCard></AppointmentCard>
                        <AppointmentCard></AppointmentCard>
                        <AppointmentCard></AppointmentCard>
                        <AppointmentCard></AppointmentCard>
                        <AppointmentCard></AppointmentCard>
                    </div>
                </div>
            </section>
        </>
    )
}