import Navbar from "../../../LABORATORI-1/src/components/Navbar.jsx"
import SectionHome from "../../../LABORATORI-1/src/sections/SectionHome.jsx";
import DocCards from "../../../LABORATORI-1/src/components/DocCards.jsx";
import WhyUs from "../../../LABORATORI-1/src/sections/WhyUs.jsx";
import Booking from "../../../LABORATORI-1/src/sections/Booking.jsx";
import Specialties from "../../../LABORATORI-1/src/sections/Specialties.jsx";
import Step from "../../../LABORATORI-1/src/sections/Step.jsx";
import Payment from "../../../LABORATORI-1/src/sections/Payment.jsx";
import Footer from "../../../LABORATORI-1/src/components/Footer.jsx";

export default function Home(){

return(

<>
<Navbar></Navbar>
<SectionHome></SectionHome>
<DocCards></DocCards>
<WhyUs></WhyUs>
<Booking></Booking>
<Specialties></Specialties>
<Step></Step>
<Payment></Payment>
<Footer></Footer>

</>

)
}