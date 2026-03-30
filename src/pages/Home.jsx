import Navbar from "./components/Navbar";
import SectionHome from "./sections/SectionHome";
import DocCards from "./components/DocCards";
import WhyUs from "./sections/WhyUs";
import Booking from "./sections/Booking";
import Specialties from "./sections/Specialties.jsx";
import Step from "./sections/Step.jsx"
import Payment from "./sections/Payment.jsx"

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

</>

)
}