import Specialtie from "./Specialtie";

export default function Specialties(){
return(
    <>
         <section className="flex justify-center items-center w-full min-h-screen flex-col md:flex-row ">
      <div className="h-full w-full">
        <h2 className="text-[30px] font-bold  text-center mb-[30px]">OUR EXPERTISE</h2>


        <div className="flex justify-center items-center flex-col md:flex-row w-[90%] min-h-[80vh]  mx-auto">
          <div className="w-full h-full   ">

            <div className="flex justify-center items-center flex-wrap min-h-[60vh]  gap-[40px]">

            <Specialtie src="https://i.pinimg.com/1200x/97/9a/82/979a828e4e7ea9e63d4f34ed453c0619.jpg" specialty="VENEERS"></Specialtie>
            <Specialtie src="https://i.pinimg.com/1200x/b7/f4/42/b7f442fb7a803dfe3c8d6f71c8f7ea19.jpg" specialty="INISALIGN"></Specialtie>
            <Specialtie src="https://i.pinimg.com/1200x/b3/cf/1a/b3cf1a25c44d3535a1fa60cec7bc2d61.jpg" specialty="DENTAL CROWN"></Specialtie>
            <Specialtie src="https://i.pinimg.com/736x/c0/15/7a/c0157a0dc242313607ed682c76227613.jpg" specialty="LASER FILLINGS"></Specialtie>
            <Specialtie src="https://i.pinimg.com/1200x/59/3e/38/593e38489c1ca57a4bc73930b905e234.jpg" specialty="IMPLANS"></Specialtie>
            <Specialtie src="https://i.pinimg.com/736x/63/96/d0/6396d03377e455ed29e59a2405a8b16f.jpg" specialty="ROOT CANAL"></Specialtie>

    

            

            
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
);
}