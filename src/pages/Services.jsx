import Navbar from "../../../LABORATORI-1/src/components/Navbar.jsx";
import Hero from "../../../LABORATORI-1/src/sections/ServiceHero.jsx";
import Book from "../../../LABORATORI-1/src/sections/Book.jsx";
import Card from "../../../LABORATORI-1/src/components/ServiceCard.jsx";
import BeforeAfter from "../sections/BeforeAfer.jsx";
import Faq from "../../../LABORATORI-1/src/sections/Faq.jsx";
import Footer from "../../../LABORATORI-1/src/components/Footer.jsx";

export default function Services() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Book></Book>
      <section className="mt-[100px] mb-[100px] w-[97%]  mx-auto min-h-[90vh] flex justify-center items-center flex-wrap flex-col md-flex-row">
        <div className="">
          <h1 className="text-center text-[#0F766E] font-bold text-[30px] mb-[60px]">
            OUR SERVICES
          </h1>
          <div className=" flex justify-center items-center gap-[170px] flex-wrap">
            <Card
              image="https://i.pinimg.com/736x/06/aa/45/06aa45b72a325b21a45fb5b2f25ce30a.jpg"
              treatment="Routine check-up"
              text="Regular dental exams to maintain oral health, detect issues early, and keep your smile in top condition."
            />

            <Card
              image="https://i.pinimg.com/1200x/54/ad/29/54ad2929e5ff1610f93ff20f550752bf.jpg"
              treatment="Prosthodontic treatments"
              text="Restoration and replacement of missing or damaged teeth using crowns, bridges, and dentures."
            />

            <Card
              image="https://i.pinimg.com/1200x/59/3e/38/593e38489c1ca57a4bc73930b905e234.jpg"
              treatment="Dental Implant Surgery"
              text="Permanent solution for missing teeth using implants that look, feel, and function like natural teeth."
            />

            <Card
              image="https://i.pinimg.com/736x/69/05/20/690520eac20a2b372e3cfac08f6eb156.jpg"
              treatment="Orthodontic Appliances"
              text="Braces and aligners to straighten teeth, correct bite issues, and improve overall dental alignment."
            />

            <Card
              image="https://i.pinimg.com/1200x/bf/3a/c5/bf3ac5ecdb7af1e771e4c827baa9b3ff.jpg"
              treatment="Tooth Extractions"
              text="Safe and gentle removal of damaged or problematic teeth to protect your oral health."
            />

            <Card
              image="https://i.pinimg.com/736x/38/b2/fc/38b2fce3cb2221607d89cd27bfb2a717.jpg"
              treatment="Oral Radiography"
              text="Advanced dental imaging to diagnose issues accurately and plan effective treatments."
            />

            <Card
              image="https://i.pinimg.com/736x/0d/d0/93/0dd0933b6bc99219f68e0e807e20b7bd.jpg"
              treatment="Root Canal Treatment"
              text="Treatment to remove infection inside the tooth and save it from extraction."
            />

            <Card
              image="https://i.pinimg.com/736x/7f/8e/a0/7f8ea0a58821aba25f76043998a7cf7b.jpg"
              treatment="Teeth whitening"
              text="Professional whitening treatments to brighten your smile and remove stains."
            />

            <Card
              image="https://i.pinimg.com/736x/1b/89/f8/1b89f891d5ad97578ce2788e12c28a42.jpg"
              treatment="Dental Cleaning"
              text="Thorough cleaning to remove plaque and tartar, helping prevent cavities and gum disease."
            />

            <Card
              image="https://i.pinimg.com/1200x/c0/f3/a6/c0f3a6556eedd8813f4b1f93a7266642.jpg"
              treatment="Full Mouth Reconstruction"
              text="Comprehensive treatment plan to restore function, health, and aesthetics of your entire mouth."
            />

            <Card
              image="https://i.pinimg.com/1200x/81/c9/cd/81c9cdefff2b8eb1f684bd581f1c0bca.jpg"
              treatment="Tooth Reshaping"
              text="Cosmetic contouring to improve the shape, size, and overall appearance of your teeth."
            />

            <Card
              image="https://i.pinimg.com/1200x/87/50/ee/8750ee3789cc53989f0717663f3d4832.jpg"
              treatment="Gum Treatment"
              text="Care and treatment for gum disease to restore healthy gums and support your teeth."
            />
          </div>
        </div>
      </section>
      <BeforeAfter></BeforeAfter>
      <Faq></Faq>
      <Footer></Footer>
    </>
  );
}
