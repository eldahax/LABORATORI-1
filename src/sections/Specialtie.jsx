export default function Specialtie(props){
    return(
        <>
        <div className="group  w-[400px] h-[270px] relative rounded-xl overflow-hidden cursor-pointer">
                <img src={props.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                  alt="Dental Veneers"></img>
                <div className="absolute inset-0 bg-black/40 "></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold tracking-wide">
                   {props.specialty}
                  </h3>
                </div>
              </div>
</>
    )
 }