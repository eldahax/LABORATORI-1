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
import TableRoom from "./sections/Tables/TableRoom";
import AddRoom from "./Crudforms/AddRoom";
import EditRoom from "./Crudforms/EditRoom";
import OfferTable from "./sections/Tables/OfferTable";
import AddOffers from "./Crudforms/AddOffers";
import EditOffers from "./Crudforms/EditOffers";
import InventoryTable from "./sections/Tables/InventoryTable";
import AddInventory from "./Crudforms/AddInventory";
import EditInventory from "./Crudforms/EditInventory";
import ContactForm from "./sections/ContactForm";
import AddContact from "./Crudforms/AddContact";
import ContactTable from "./sections/Tables/ContactTable";
import TableWorkSchedule from "./sections/Tables/TableWorkSchedule";
import AddWorkSchedule from "./Crudforms/AddWorkSchedule";
import EditWorkSchedule from "./Crudforms/EditWorkSchedule";
import EditDentalRecord from "./Crudforms/EditDentalRecord";
import DentalTable from "./sections/Tables/DentalTable";


function App() {
  return (
    <Routes>
      <Route path="/work-schedules" element={<TableWorkSchedule />} />
      <Route path='/Patients' element={<TablePatient />} />
      <Route path='/Treatments' element={<TableTreatment />} />
      <Route path='/Users' element={<Table />} />
      <Route path='/Doctors' element={<DoctorTable />} />
      <Route path="/rooms" element={<TableRoom />} />
      <Route path="/offers" element={<OfferTable />} />
      <Route path="/inventory" element={<InventoryTable />} />
      <Route path="/dental-history" element={<DentalTable />} />
      <Route path="/dental-history/edit/:id" element={<EditDentalRecord />}
      />


      <Route path="/contact" element={<Contact />} />
      <Route path="/contacts" element={<ContactTable />} />
      <Route path="/add-contact" element={<AddContact />} />

      <Route path="/add-work-schedule" element={<AddWorkSchedule />} />
      <Route path="/addI" element={<AddInventory />} />
      <Route path="/addO" element={<AddOffers />} />
      <Route path="/addRoom" element={<AddRoom />} />
      <Route path="/addP" element={<AddPartient />} />
      <Route path="/add" element={<AddDoc />} />
      <Route path="/addT" element={<AddTreatment />} />
      <Route path="/work-schedules/edit/:id" element={<EditWorkSchedule />} />
      <Route path="/inventory/edit/:id" element={<EditInventory />} />
      <Route path="/offers/edit/:id" element={<EditOffers />} />
      <Route path="/rooms/edit/:id" element={<EditRoom />} />
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
      <Route path='/add' element={<Appointments />} />

    </Routes>
  );
}

export default App;