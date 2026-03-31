
export default function Card(props){

    return(
        <>
            <div class="holder w-[340px] h-[560px] border-none ">
            <div class="img w-full h-[500px] border-black border-[1px] rounded-[100px] ">
                <img src={props.image} alt="" class="  shadow-md rounded-[100px] w-full h-full object-cover overflow-hidden"/>
            </div>
            <div class="text">
           <p class="text-[#0F766E] font-bold text-[25px] pl-[10px]">{props.treatment}</p>
             <p class="text-gray-500 text-[16px] pl-[7px] mt-[4px]">{props.text}</p>
             <button class=" bg-[#0F766E] text-white px-6 py-2 rounded-lg mt-[10px]">BOOK</button>
            </div>
        </div>
        </>
    )
}