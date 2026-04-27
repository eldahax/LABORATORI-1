import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import EditUser from "./Crudforms/EditUser";
import PersonalProfile from "./pages/PersonalProfile"
import EditPatient from "./Crudforms/EditPatient";
import AddPartient from "./Crudforms/AddPatient"
import AddDoc from "./Crudforms/AddDoctor";
import EditDoctor from "./Crudforms/EditDoctor"
import EditTreatment from "./Crudforms/EditTreatment";
import AddTreatment from "./Crudforms/AddTreatment";
import TablePatient from "./sections/Tables/TablePatient";
import TableTreatment from "./sections/Tables/TableTreatment";
import Table from "./sections/Tables/Table";
import DoctorTable from "./sections/Tables/DoctorTable";
function App() {
  return (
    <Routes>
      <Route path='/Patients' element={<TablePatient />} />
      <Route path='/Treatments' element={<TableTreatment />} />
      <Route path='/Users' element={<Table />} />
      <Route path='/Doctors' element={<DoctorTable />} />

      <Route path="/addP" element={<AddPartient />} />
      <Route path="/add" element={<AddDoc />} />
      <Route path="/addT" element={<AddTreatment />} />
      <Route path="/treatments/edit/:id" element={<EditTreatment />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/patients/edit/:id" element={<EditPatient />} />
      <Route path="/doctors/edit/:id" element={<EditDoctor />} />
      <Route path="/" element={<Home />} />
      <Route path="/Profile" element={<PersonalProfile />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Services' element={<Services />} />
      <Route path='/Appointments' element={<Appointments />} />

    </Routes>
  );
}

export default App;