import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-1/4 p-10 flex flex-col items-center text-white bg-[#0F766E] fixed top-0 left-0 h-screen mt-[40px]">
      <img
        src="../../src/assets/images/Staff2.jpg"
        className="rounded-full mb-4 border-2 border-white w-[370px] h-[350px]"
        alt="profile"
      />

      <h3 className="font-semibold text-xl">Aurela Domniku</h3>
      <p className="text-sm mb-8 opacity-80">Dentist</p>

      <div className="w-full space-y-20">
          <Link to='/Profile'>
        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
        Personal Information
        </div>
        </Link>
     
        <Link to='/Staff'>
        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
         Staff portal
        </div>
        </Link>
        
        <Link to='/Notification'>
        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
          Notification
        </div>
        </Link>

        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



