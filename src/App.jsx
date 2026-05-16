import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import EditUser from "./Crudforms/EditUser";
import PersonalProfile from "./pages/PersonalProfile";
import EditPatient from "./Crudforms/EditPatient";
import AddPartient from "./Crudforms/AddPatient";
import AddDoc from "./Crudforms/AddDoctor";
import EditDoctor from "./Crudforms/EditDoctor";
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
import CreateDepartment from "./Crudforms/AddDepartment";
import DepartmentsTable from "./sections/Tables/DepartmentTable";
import EditDepartment from "./Crudforms/EditDepartment";
import AddApointment from "./Crudforms/AddApointment"
import AppointmentTable from "./sections/Tables/AppointmentTable";
import EditAppointment from "./Crudforms/EditAppointment";
import TableWorkSchedule from"./sections/Tables/TableWorkSchedule";
import AddWorkSchedule from "./Crudforms/AddWorkSchedule";
import EditWorkSchedule from "./Crudforms/EditWorkSchedule";
import RouteProtect from "./components/RouteProtect";
function App() {
  return (
    <Routes>
        <Route path="/work-schedules/edit/:id" element={<EditWorkSchedule />} />
        <Route path="/add-work-schedule" element={<AddWorkSchedule />} />
       <Route path="/work-schedules" element={<TableWorkSchedule />} />
       <Route path="/addApointment" element={<AddApointment />} />
      <Route path="/" element={<Home />} />
       <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/appointments/edit/:id" element={< EditAppointment/>} />

      <Route
        element={<RouteProtect allowedRoles={["admin", "doctor", "patient"]} />}
      >
        <Route path="/Profile" element={<PersonalProfile />} />

      </Route>

      <Route element={<RouteProtect allowedRoles={["admin", "doctor"]} />}>
        <Route path="/Patients" element={<TablePatient />} />
        <Route path="/addP" element={<AddPartient />} />
        <Route path="/patients/edit/:id" element={<EditPatient />} />
        <Route path="/Doctors" element={<DoctorTable />} />
        <Route path="/add" element={<AddDoc />} />
        <Route path="/doctors/edit/:id" element={<EditDoctor />} />
        <Route path="/Treatments" element={<TableTreatment />} />
        <Route path="/addT" element={<AddTreatment />} />
        <Route path="/treatments/edit/:id" element={<EditTreatment />} />
        <Route path="/appointments" element={<AppointmentTable/>} />
      </Route>

      <Route element={<RouteProtect allowedRoles={["admin"]} />}>
        <Route path="/Users" element={<Table />} />

        <Route path="/rooms" element={<TableRoom />} />
        <Route path="/offers" element={<OfferTable />} />
        <Route path="/inventory" element={<InventoryTable />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/inventory" element={<InventoryTable />} />
        <Route path="/addI" element={<AddInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/departments" element={<DepartmentsTable />} />
        <Route path="/dep" element={<CreateDepartment />} />
        <Route path="/departments/edit/:id" element={<EditDepartment />} />
        <Route path="/addO" element={<AddOffers />} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/offers/edit/:id" element={<EditOffers />} />
        <Route path="/rooms/edit/:id" element={<EditRoom />} />

        <Route path="/inventory/edit/:id" element={<EditInventory />} />

        <Route path="/add" element={<Appointments />} />
      </Route>

    </Routes>
  );
}

export default App;