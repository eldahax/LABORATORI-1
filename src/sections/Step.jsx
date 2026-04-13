export default function Step(){

    return(
        <>
        
           <section
      className="flex justify-center items-center  w-full min-h-[80vh] flex-col md:flex-row px-[10px] mt-[50px] md:mt-[20px]">
      <div className=" mt-[30px] mb-[40px]">
        <h1 className="text-black text-[40px] font-bold text-center">STEP <span
            className="text-[#0F766E] text-[40px] font-bold text-center">INSIDE</span></h1>

        <div className="flex justify-center items-center w-[full] min-h-[50vh] flex-col md:flex-row">

          <div className=" w-full h-full flex justify-center items-center gap-[100px] flex-wrap">
            <img
              src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/13/corpus-architects-dental-studio--quot-my-dental-quot---interior-design-project-hospitals-archello.1605282088.1975.jpg"
              alt="" className="w-[700px] h-[700px] border-none object-cover"></img>

            <div className=" pt-[160px]">
              <img
                src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/13/corpus-architects-dental-studio--quot-my-dental-quot---interior-design-project-hospitals-archello.1605282138.1459.jpg"
                alt="" className="w-[600px] h-[360px] mb-[40px]"></img>
              <img
                src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/13/corpus-architects-dental-studio--quot-my-dental-quot---interior-design-project-hospitals-archello.1605282130.9171.jpg"
                alt="" className="w-[600px] h-[350px] "/>


            </div>
          </div>

        </div>
      </div>
    </section>
    </>
    )
}