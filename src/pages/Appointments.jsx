import AppointmentCard from "../../../LABORATORI-1/src/sections/AppointmentCard";
export default function Appointment() {


    return (
        <>

            <section class="w-[100%] min-h-[100vh] mt-[70px] flex justify-between items-center flex-wrap md:flex-col  p-10 mt-[140px]">

                <div class="w-full h-full">
                    <h2 class="text-[40px] text-center font-bold text-gray-600 mb-[40px]">APPOINTMENTS</h2>

                    <AppointmentCard></AppointmentCard>
                    <AppointmentCard></AppointmentCard>
                    <AppointmentCard></AppointmentCard>
                </div>
            </section>
        </>
    )
}