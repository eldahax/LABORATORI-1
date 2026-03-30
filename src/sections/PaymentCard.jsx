export default function PaymentCard(props){

    return(
        <>
         <div
            class="w-[300px] h-[400px] shadow-xl  py-[30px] px-[17px] rounded-2xl text-center flex flex-col justify-between bg-white hover:scale-105 transition-transform duration-300">


            <p class="text-[#0F766E] text-2xl font-bold mb-[5px]">{props.name}</p>


            <div class="space-y-4 text-gray-700">
              <p class="font-semibold">{props.one}</p>
              <p class="font-semibold">{props.two}</p>
              <p class="font-semibold">{props.three}</p>
              <p class="font-semibold">{props.four}</p>
              <p class="font-semibold">{props.five}</p>

            </div>

            <p class="text-[#0F766E] text-2xl md:text-3xl font-bold mt-[37px]">{props.price}</p>


            <button
              class="bg-[#0F766E] text-white font-bold rounded-lg py-[7px] px-[16px] mt-[8px] hover:bg-[#0d5c56] transition">
              CHOOSE
            </button>
          </div>
          </>
    )
}