

import PaymentCard from "./PaymentCard"

export default function Payment(){
    return(
        <>
        
    <section
      className="flex justify-center items-center w-full min-h-screen flex-col md:flex-row flex-wrap mt-[50px] md:mt-[20px]">


      <div className="w-full h-full ">
        <h2 className="text-[30px]  text-center font-bold mb-[20px]">PAYMENT PLANS</h2>
        <p className="text-gray-600 text-[20px] text-center mb-[70px]">Flexible payment options designed to make quality
          dental care affordable and stress-free.</p>

        <div className="flex justify-center items-center flex-wrap md:flex-row flex-col w-full min-h-full gap-[80px] ">

         <PaymentCard name='BASIC' one='1 cleaning per year' two='1 dental exam' three='Emergency consultation' price='27$ / month'></PaymentCard>
         <PaymentCard name='STANDARD' one='2 cleanings per year' two='1 Emergency consultation' three='1  Emergency consultation' price='47$ / month'></PaymentCard>
         <PaymentCard name='PREMIUM' one='5 cleanings per yearr' two="2 dental exam's"  three="x-ray's included" four="cosmetic consultation" five='Emergency consultation'  price='80$ / month'></PaymentCard>

       




        </div>
        </div>

    </section>
    </>
    )
}