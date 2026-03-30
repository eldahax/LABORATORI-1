

  import BookingCards  from "./BookingCard";
 
 export default function Booking(){
return(
    <>
     <section className="w-full  py-[100px] px-[40px]">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-[35px] font-bold mb-[8px]  tracking-widest">HOW BOOKING WORKS</h2>
        <p className="text-gray-600 text-lg mb-[25px]">
          Simple steps to get the care your smile deserves
        </p>

        <div className=" min-h-[35vh] flex flex-col md:flex-row items-center justify-between gap-[30px]">


          

        <BookingCards number='1' headText='Choose a services' txt=' Select cleaning, checkup, cosmetic treatment or any dental service.'></BookingCards>
         <BookingCards number='2' headText='Pick Date & Time' txt=' Choose a convenient appointment slot from our schedule.'></BookingCards>
       <BookingCards number='3' headText='Enter Your Details' txt=' Fill in your contact info and any important medical details.'></BookingCards>
        <BookingCards number='4' headText='Confirm & Visit' txt='  Get confirmation and visit us for a smooth dental experience.'></BookingCards>


        </div>

        <button className="mt-[15px] bg-[#0F766E] text-white px-[38px] py-[14px] rounded-lg font-semibold hover:bg-[#0d5c56] transition">
          BOOK APPOINTMENT
        </button>

      </div>
    </section></>
)
 }