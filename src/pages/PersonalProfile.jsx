import sideBar from "../../../LABORATORI-1/src/sections/sideBar.jsx";
import Forme from "../../../LABORATORI-1/src/sections/Forme.jsx";

const PersonalProfile = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <div className="w-3/4 bg-white p-10">
        <h2 className="text-3xl font-semibold mb-8">
          Personal Information
        </h2>

        <Forme />
      </div>
    </div>
  );
};

export default PersonalProfile;