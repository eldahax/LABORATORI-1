import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[70px] left-4 text-3xl text-[#134E4A] z-[60]"
      >
        ☰
      </button>

      <div className=" mt-[50px] hidden md:flex fixed top-0 left-0 h-screen w-1/4 bg-gradient-to-b from-[#134E4A] via-[#0F766E] to-[#5EEAD4] text-white flex-col items-center p-6 z-[40]">
        <div className="w-full space-y-3">
          <Link to="/Profile" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Personal Information
          </Link>

          <Link to="/Users" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Users
          </Link>
          <Link to="/Patients" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Patients
          </Link>
          <Link to="/Doctors" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Doctors
          </Link>
          <Link to="/Treatments" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Treatments
          </Link>
          <Link to="/Rooms" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Rooms
          </Link>
          <Link to="/Offers" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Offers
          </Link>
          <Link to="/Inventory" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Inventory
          </Link>
          <Link to="/contacts" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Contacts
          </Link>
          <Link to="/Staff" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Appointment's
          </Link>
          <Link to="/Staff" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Dental History
          </Link>
          <Link to="/Staff" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Work Schedule
          </Link>
          <Link to="/Staff" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Reminders and Notificatiosn
          </Link>
        </div>
      </div>


      {isOpen && (
        <>

          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-[50] md:hidden"
          />


          <div className="fixed top-[60px] left-0 w-full bg-[#0F766E] text-white z-[60] md:hidden">
            <ul className="flex flex-col items-center gap-4 py-6">

              <li onClick={() => setIsOpen(false)}>
                <Link to="/Profile">Personal Information</Link>
              </li>

              <li onClick={() => setIsOpen(false)}>
                <Link to="/Staff">Staff Portal</Link>
              </li>

              <li onClick={() => setIsOpen(false)}>
                <Link to="/Notification">Notification</Link>
              </li>

              <li onClick={() => setIsOpen(false)}>
                Log Out
              </li>

            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;