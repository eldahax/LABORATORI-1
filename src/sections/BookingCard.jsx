
 
export default function Booking(props) {
    
   return (
     <div className="flex flex-col items-center text-center w-[300px] font-FaAnchor">
       <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-[#0F766E] text-white text-2xl font-bold mb-[20px]">
         {props.number}
       </div>
       <div>
         <h3 className="font-semibold text-xl mb-[8px]">{props.headText}</h3>
         
       
       </div>
       <p className="text-gray-600" >{props.txt}</p>
       <p
           className="text-indigo-600 text-[14px] cursor-pointer"
         >
         </p>
         <div className="text-[#0F766E]">
            
         </div>
     </div>
   );
 }
 