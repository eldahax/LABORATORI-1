
export default function Card(props){

    return(
        <>
            <div className="holder w-[340px] h-[460px] border-none ">
            <div className="img w-full h-[400px] border-black border-[1px] rounded-[100px] ">
                <img src={props.image} alt="" className="  shadow-md rounded-[100px] w-full h-full object-cover overflow-hidden"/>
            </div>
            <div className="text">
           <p className="text-[#0F766E] font-bold text-[25px] pl-[10px]">{props.treatment}</p>
             <p className="text-gray-500 text-[16px] pl-[7px] mt-[4px]">{props.text}</p>
             <button className=" bg-[#0F766E] text-white px-6 py-2 rounded-lg mt-[10px]">BOOK</button>
            </div>
        </div>
        </>
    )
}