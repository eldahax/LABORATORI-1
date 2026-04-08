import Navbar from '../../../LABORATORI-1/src/components/Navbar.jsx';
import ContactInfo from '../../../LABORATORI-1/src/sections/ContactInfo.jsx';
import ContactForm from '../../../LABORATORI-1/src/sections/ContactForm.jsx';
import Footer from '../../../LABORATORI-1/src/components/Footer.jsx';



const Contact = () => {
    return (
        <>
            <Navbar></Navbar>

            <main className="pt-[40px] ">
                <section className="py-35 px-4 relative overflow-hidden">


                    <div className="absolute top-[-100px] left-0 w-full h-[400px] 
        bg-gradient-to-b from-[#0F766E]/50 via-[#0F766E]/30 to-transparent pointer-events-none z-0"></div>

                    <div className="max-w-6xl mx-auto relative z-10">


                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Contact Us
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Send us a message and our dental team will get back to you shortly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <ContactInfo
                                title="Contact Information"
                                address="Prishtina, Kosovo"
                                phone="+383 38 000 000"
                                email="info@agusholli-dent.com"
                                emergencyNote=" Emergency dental services are available 24/7."
                            />


                           <ContactForm></ContactForm>

                        </div>

                    </div>
                </section>
            </main>

            <Footer></Footer>
        </>
    );
};

export default Contact;