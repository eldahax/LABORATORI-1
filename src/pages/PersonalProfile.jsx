import Sidebar from "../../../LABORATORI-1/src/sections/sideBar.jsx";
import Forme from "../../../LABORATORI-1/src/sections/Forme.jsx";
import Navbar from "../components/Navbar.jsx";

const PersonalProfile = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="flex w-full min-h-screen mt-[50px]">
     
      <Sidebar />

      <div className="w-3/4 bg-white p-10 ml-[25%]">
        <h2 className="text-3xl font-semibold mb-8">
          Personal Information
        </h2>

        <Forme />
      </div>
    </div>
    </>
  );
};

export default PersonalProfile;