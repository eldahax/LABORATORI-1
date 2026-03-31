

export default function Hero(){

    return(
        <>
        
 <section class=" mx-auto w-full min-h-[110vh]  max-w-[600px]:h-[125vh] flex justify-center items-center flex-col-reverse bg-gradient-to-b from-[#134E4A] via-[#0F766E] to-white  overflow-hidden">
 <div class="mx-auto  min-h-[110vh] w-full flex justify-center items-center flex-col-reverse md:flex-row bg-black/20">
  <div class="sm:w-full sm:h-50vh lg:w-[50%] lg:h-[50vh]   ">
    <h1 class="pl-[20px] text-white  text-[35px] font-bold mb-[40px]">THE BEST DENTAL CARE AWAITS</h1>
    <p class="text-[20px] pl-[20px] text-white mb-[40px] ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi dolore, corporis dolorem deleniti cupiditate incidunt excepturi impedit eum distinctio magni molestias vitae optio assumenda sint error cumque dolor expedita nam!</p>
    <p class="pl-[20px] text-white font-semibold mb-4">
  Trusted by 50,000+ patients • 24/7 Emergency Care • Certified Specialists</p>
  <div class="flex gap-4 pl-[20px]">
  <button class="text-[14px] text-white font-bold px-[20px] py-[10px] rounded-[10px] bg-teal-800 shadow-md">
    OUR SERVICES
  </button>

  <button class="text-[14px] font-bold px-[10px] py-[10px] rounded-[10px] border-2 border-white text-white">
    BOOK APPOINTMENT
  </button>
</div>

  </div>
  <div class="sm:w-full sm:h-[50vh] lg:w-[30%] lg:h-[90vh]  max-[600px]:mt-[70px] ">
    <img src="src/assets/images/c2939ba0e0e0bcb0d5e720bf76e36167.png" alt="" class="w-full h-full object-cover"/>
  </div>
 </div>
 </section>

</>
    )
}