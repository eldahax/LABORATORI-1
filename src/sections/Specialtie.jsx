export default function Specialtie(props){
    return(
        <>
        <div class="w-[400px] h-[270px] relative rounded-xl overflow-hidden">
                <img src={props.src}
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  alt="Dental Veneers"></img>
                <div class="absolute inset-0 bg-black/40 "></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <h3 class="text-white text-3xl font-bold tracking-wide">
                   {props.specialty}
                  </h3>
                </div>
              </div>
</>
    )
 }