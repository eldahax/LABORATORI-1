import { useState } from "react";
import {Link} from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] bg-white flex items-center px-16 shadow-md min-[300px]:px-[20px] z-50">
      <div className="flex justify-between items-center w-full">
      
        <h1 className="text-2xl font-bold text-[#0F766E] tracking-widest">
          AGUSHOLLI-DENT
        </h1>

        
        <ul className="flex items-center gap-3 max-[950px]:hidden">
          <li ><Link className="text-black font-bold px-2 " to="/Home">HOME</Link></li>
          <li><Link className="text-black font-bold px-2" to="/About">ABOUT</Link></li>
          <li><Link className="text-black font-bold px-2" to="/Contact">CONTACT</Link></li>
          <li><Link className="text-black font-bold px-2" to="/services">SERVICES</Link></li>
          <li><Link className="text-black font-bold px-2" to="/Appointments">APPOINTMENTS</Link></li>
          <li><Link className="text-black font-bold px-2" to="/">PROFILE</Link></li>
          <li>
            <Link className="text-white font-semibold px-6 py-2 rounded-lg bg-[#0F766E] hover:bg-white hover:text-[#0F766E] transition ease-in-out" to="/">
              LOGIN
            </Link>
          </li>
        </ul>

      
    
        <div
          className="max-[950px]:block min-[951px]:hidden cursor-pointer text-[#134E4A] text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      
      {isOpen && (
        <ul className="flex flex-col items-center gap-4 bg-white w-full absolute top-[60px] left-0 shadow-md py-6 px-2 max-[950px]:block min-[951px]:hidden">
          <li className=" mb-[10px] "><Link className="text-black font-bold px-2 mb-[5px] " to="/Home">HOME</Link></li>
          
          <li className=" mb-[10px] "><Link className="text-black font-bold px-2" to="/About">ABOUT</Link></li>
          <li className=" mb-[10px] "><Link className="text-black font-bold px-2" to="/Contact">CONTACT</Link></li>
          <li className=" mb-[10px] "> <Link className="text-black font-bold px-2" to="/Services">SERVICES</Link></li>
          <li className=" mb-[10px]"> <Link className="text-black font-bold px-2" to="/Appointments">APPOINTMENTS</Link></li>
          <li className=" mb-[16px] "><Link className="text-black font-bold px-2" to="/Profile">PROFILE</Link></li>
          <li className=" mb-[10px] ">
            <Link className="text-white font-semibold px-6 py-2 rounded-lg bg-[#0F766E] hover:bg-white hover:text-[#0F766E] transition ease-in-out" to="/">
              LOGIN
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;