import Navbar from "../../../LABORATORI-1/src/components/Navbar.jsx"
import AboutSection  from "../../../LABORATORI-1/src/sections/AboutSection.jsx";
import Stats from "../../../LABORATORI-1/src/sections/Stats";
import Slider from "../../../LABORATORI-1/src/components/Slider.jsx";
import Mission from "../../../LABORATORI-1/src/sections/Mission.jsx";
import Revitalize  from "../../../LABORATORI-1/src/sections/Revitalize.jsx";
import Footer from "../../../LABORATORI-1/src/components/Footer.jsx";

export default function About() {
    return (
        <>

                <Navbar></Navbar>

                <AboutSection
                    
                        img1= "/images/Klinika.jpg"
                        img2= "/images/Pacient.jpg"
                        img3= "/images/Photo.jpg"
                        img4= "/images/Smile.jpg"
                        subtitle= "About Us"
                        title= "Creating Beautiful Smiles With Care"
                        description= "A confident smile is the key to a healthy life. Our clinic combines modern technology with personalized care to provide the best dental experience for every patient."
                        feature1= "Modern equipment & technology"
                        feature2= "Friendly & experienced team"
                        feature3= "Personalized treatment plans"
                        buttonText= "Learn More"
                   
                />

                <Stats
                  
                        stat1Value= "24/7" stat1Label= "Emergency Service"
                        stat2Value= "25k+" stat2Label= "Happy Patients"
                        stat3Value= "15+" stat3Label="Years Experience"
                        stat4Value= "100%" stat4Label= "Satisfaction"
                  
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

                <Slider
                    
                        img1= "https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/dentist-smile-tijuana-scaled.webp?fit=1371%2C1920&quality=80&ssl=1"
                        img2= "https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/Dentist-smile-scaled.webp?fit=1371%2C1920&quality=80&ssl=1"
                        img3= "https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/dentist-in-tijuana-black.jpeg?fit=%2C&quality=89&ssl=1"
                        img4= "https://i0.wp.com/pureaestheticdentistry.com/wp-content/uploads/2025/04/tijuana-dentist-pro-scaled.webp?fit=1371%2C1920&quality=80&ssl=1"
                
                />

                <Revitalize
                    title="Revitalize Your Smile Today"
                    description="Our mission is to provide high-quality dental services in a relaxing environment. We focus on long-term care and building trust with every patient."
                    feat1="Advanced dental technology"
                    feat2="Comfortable & safe environment"
                    feat3="Trusted by thousands of patients"
                    image="https://i.pinimg.com/1200x/e5/c1/7d/e5c17d1200c5cc265979fbb2d8a56339.jpg"
                />

                <Footer
                  
                />
       
        </>
    );
}