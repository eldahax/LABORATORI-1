export default function  SectionHome(){
    return(
<>
   <section class="relative min-h-[100vh] w-full overflow-hidden ">

      <div class="absolute top-0 left-0 w-full h-screen ">
        <img src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/13/corpus-architects-dental-studio--quot-my-dental-quot---interior-design-project-hospitals-archello.1605282138.1459.jpg" alt="" class="h-full w-full object-cover"></img>
      </div>



      <div class="absolute top-0 left-0 w-full min-h-full bg-black/50  "></div>


      <div class="relative flex items-center justify-center min-h-[100vh]">
        <div class="text-center text-white px-[8px] mx-auto px-auto w-[50%] space-y-4">
          <h1 class="text-[22px] md:text-[40px] font-bold mb-[10px] tracking-widest">AGUSHOLLI-DENT</h1>
          <p class="text-[18px] md:text-[24px] mb-[50x]">Your smile deserves the best care</p>
          <p class="text-[20px] mb-[10px]">
            We provide modern dental care focused on keeping your smile healthy, bright, and confident
          </p>
          <button
            class="bg-[#0F766E] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#0d5c56] transition">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
</>
    );
}

