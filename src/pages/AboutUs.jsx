import Navbar from "../../../LABORATORI-1/src/components/Navbar.jsx"
import AboutSection from "../../../LABORATORI-1/src/sections/AboutSection.jsx";
import Stats from "../../../LABORATORI-1/src/sections/Stats";
import Mission from "../../../LABORATORI-1/src/sections/Mission.jsx";
import Revitalize from "../../../LABORATORI-1/src/sections/Revitalize.jsx";
import Footer from "../../../LABORATORI-1/src/components/Footer.jsx";
import img2 from "../../../LABORATORI-1/src/assets/Pacient.jpg";
import img3 from "../../../LABORATORI-1/src/assets/images/Photo.jpg";
import img4 from "../../../LABORATORI-1/src/assets/images/Smile.jpg";

export default function About() {
    return (
        <>

            <Navbar></Navbar>

            <AboutSection

                img1="https://i.pinimg.com/736x/91/ca/d1/91cad141aa6e77434490f5b51974c41b.jpg"
                img2={img2}
                img3={img3}
                img4={img4}
                subtitle="About Us"
                title="Creating Beautiful Smiles With Care"
                description="A confident smile is the key to a healthy life. Our clinic combines modern technology with personalized care to provide the best dental experience for every patient."
                feature1="Modern equipment & technology"
                feature2="Friendly & experienced team"
                feature3="Personalized treatment plans"
                buttonText="Learn More"

            />

            <Stats

                stat1Value="24/7" stat1Label="Emergency Service"
                stat2Value="25k+" stat2Label="Happy Patients"
                stat3Value="15+" stat3Label="Years Experience"
                stat4Value="100%" stat4Label="Satisfaction"

            />

            <section className="py-20 mb-[15px]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Mission
                            title="Restorative Care"
                            description="High-quality treatments to restore your smile and dental health."
                        />
                        <Mission
                            title="Cosmetic Dentistry"
                            description="Enhance your smile with modern cosmetic solutions."
                        />
                        <Mission
                            title="Pediatric Care"
                            description="Gentle and friendly care designed especially for children."
                        />
                    </div>
                </div>
            </section>

           

             <div className="mt-20 overflow-hidden relative pb-10 rounded-2xl max-w-7xl mx-auto px-6">
      <h2 className="text-[35px] font-bold mb-8 text-center">MEET THE TEAM</h2>
      
      <div className="flex gap-10 overflow-x-auto">
      
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src="https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/dentist-smile-tijuana-scaled.webp?fit=1371%2C1920&quality=80&ssl=1" className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 1" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src="https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/Dentist-smile-scaled.webp?fit=1371%2C1920&quality=80&ssl=1" className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 2" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src="https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/dentist-in-tijuana-black.jpeg?fit=%2C&quality=89&ssl=1" className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 3" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src="https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/tijuana-dentist-pro-scaled.webp?fit=1371%2C1920&quality=80&ssl=1" className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 4" />
        </div>
      </div>
    </div>

            <Revitalize
                title="Revitalize Your Smile Today"
                description="Our mission is to provide high-quality dental services in a relaxing environment. We focus on long-term care and building trust with every patient."
                feat1="Advanced dental technology"
                feat2="Comfortable & safe environment"
                feat3="Trusted by thousands of patients"
                image="https://i.pinimg.com/1200x/e5/c1/7d/e5c17d1200c5cc265979fbb2d8a56339.jpg"
            />

            <Footer></Footer>



        </>
    );
}