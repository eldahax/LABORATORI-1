export default function WhyUs(){
    return(
        <>
        
    <section class="w-full min-h-screen flex justify-center items-center  bg-white">
      <div class="w-full  flex flex-col lg:flex-row items-center gap-[30px] px-[8px] md:px-[14px]">


        <div class="lg:w-[50%] relative">
          <img src="https://i.pinimg.com/1200x/08/c2/a8/08c2a80de8ccdecf2fbca7e8b912918e.jpg"
            class="w-full h-auto object-cover " alt="Dental Office"></img>
        </div>


        <div class="lg:w-[50%] relative">

          <h1 class="text-[20px] md:text-[45px] font-light mb-[16px] lg:-translate-x-40 relative">
            it’s all in <span class="font-bold text-[#0F766E]">the details</span>
          </h1>

          <p class="mb-[12px] text-gray-700">
            Our dentist office is setting the new standard for first-class care.
            At Jackson Family Dental, your best smile isn't just a treatment, but a delightful experience.
          </p>

          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-cyan-400 mr-[7px]">»</span> Friendly faces who never judge and welcome all ages
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-[7px]">»</span> Expertise in transformative cosmetic and restorative procedures
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-[7px]">»</span> The latest technology for comfort and results
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-[7px]">»</span> Luxury amenities in a state-of-the-art environment
            </li>
          </ul>
        </div>

      </div>
    </section></>
    )
}