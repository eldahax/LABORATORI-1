export default function  SectionHome(){
    return(
<>
   <section className="relative min-h-[100vh] w-full overflow-hidden ">

      <div className="absolute top-0 left-0 w-full h-screen ">
        <img src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/13/corpus-architects-dental-studio--quot-my-dental-quot---interior-design-project-hospitals-archello.1605282138.1459.jpg" alt="" className="h-full w-full object-cover"></img>
      </div>



      <div className="absolute top-0 left-0 w-full min-h-full bg-black/50  "></div>


      <div className="relative flex items-center justify-center min-h-[100vh]">
        <div className="text-center text-white px-[8px] mx-auto px-auto w-[50%] space-y-4 max-[600px]:w-full">
          <h1 className="text-[22px] md:text-[40px] font-bold mb-[27px] tracking-widest">AGUSHOLLI-DENT</h1>
          <p className="text-[18px] md:text-[24px] mb-[26px]">Your smile deserves the best care</p>
          <p className="text-[20px] mb-[13px]">
            We provide modern dental care focused on keeping your smile healthy, bright, and confident
          </p>
          <button
            className="bg-[#0F766E] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#0d5c56] transition">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
</>
    );
}

