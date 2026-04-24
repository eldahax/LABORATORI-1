import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import EditUser from "./pages/EditUser";
import PersonalProfile from "./pages/PersonalProfile"
import EditPatient from "./pages/EditPatient";
import AddPartient from "./pages/Crudforms/AddPatient"

function App() {
  return (
    <Routes>
      <Route path="/addP" element={<AddPartient />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/patients/edit/:id" element={<EditPatient />} />
      <Route path="/" element={<Home />} />
      <Route path="/Profile" element={<PersonalProfile />} />
      <Route path="/Staff" element={<Profile />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Services' element={<Services />} />
      <Route path='/Appointments' element={<Appointments />} />
      <Route path='/Table' element={<Profile />} />
    </Routes>
  );
}

export default App;