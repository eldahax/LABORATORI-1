
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  const [user, setUser] = useState(null);

  const roles = user?.roles || [];

  return (
    <>
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[70px] left-4 text-3xl text-[#134E4A] z-[60]"
      >
        ☰
      </button>

    
      <div className="mt-[50px] hidden md:flex fixed top-0 left-0 h-screen w-1/4 bg-gradient-to-b from-[#134E4A] via-[#0F766E] to-[#5EEAD4] text-white flex-col items-center p-6 z-[40]">
        <div className="w-full space-y-3">

          
          <Link to="/Profile" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
            Personal Information
          </Link>

          
          {roles.includes("admin") && (
            <>
              <Link to="/Users" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Users
              </Link>
              <Link to="/appointments" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">appointments</Link>

              <Link to="/inventory" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Inventory
              </Link>

              
              <Link to="/rooms" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Rooms and Departments
              </Link>

              <Link to="/offers" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Offers
              </Link>

              <Link to="/work-schedules" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Work Schedule
              </Link>
            
             
              
              
            </>
          )}

          {(roles.includes("doctor") || roles.includes("admin")) && (
            <>
              <Link to="/Patients" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Patients
              </Link>

              <Link to="/Doctors" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Doctors
              </Link>

              <Link to="/Treatments" className="block text-center p-3 rounded-lg hover:bg-white hover:text-black">
                Treatments
              </Link>
            </>
          )}

        
         

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

              {roles.includes("admin") && (
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/Users">Users</Link>
                </li>
              )}

              {(roles.includes("doctor") || roles.includes("admin")) && (
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/Patients">Patients</Link>
                </li>
              )}

              <li onClick={() => setIsOpen(false)}>
                <Link to="/Appointments">Appointments</Link>
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