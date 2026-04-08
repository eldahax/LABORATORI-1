const Sidebar = () => {
  return (
    <div className="w-1/4 p-10 flex flex-col items-center text-white bg-gradient-to-b from-[#134E4A] via-[#0F766E] to-[#5EEAD4]">
      <img
        src=""
        className="rounded-full mb-4 border-2 border-white"
        alt="profile"
      />

      <h3 className="font-semibold text-xl">Aurela Domniku</h3>
      <p className="text-sm mb-8 opacity-80">Dentist</p>

      <div className="w-full space-y-4">
        <div className="bg-white text-black p-3 rounded-lg text-center cursor-pointer font-semibold">
          Personal Information
        </div>

        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
          Staff portal
        </div>

        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
          Notification
        </div>

        <div className="text-white text-center cursor-pointer hover:bg-white hover:text-black p-3 rounded-lg transition">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



