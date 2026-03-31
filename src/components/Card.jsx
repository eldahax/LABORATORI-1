

const Card = ({ name, speciality, text,img }) => {
  return (
   <>
     <div className=" w-[300px] h-[560px] border-none">
   <div className="img w-full h-[400px] border-black border rounded-[100px]">
      <img src={img}
           className="shadow-md rounded-[100px] w-full h-full object-cover" />
    </div>
    <div className="text">
      <p className="text-[#0F766E] font-bold text-[25px] pl-[10px]">{name}</p>
      <p className="text-gray-600 text-[20px] pl-[7px] font-semibold">{speciality}</p>
      <p className="text-gray-600 text-[16px] pl-[7px] mt-[4px]">
        {text}
      </p>
      <button className="bg-[#0F766E] text-white px-6 py-2 rounded-lg mt-[10px] cursor-pointer">
        BOOK
      </button>
    </div>
    </div>
    </>
  );
};

export default Card;