

export default  function Faq(){

    return(
        <>
        <section className="w-full  py-16 px-4 md:px-8">
    <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F766E] mb-3">
                Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
                Everything you need to know about our services
            </p>
            <div className="w-20 h-1 bg-[#0F766E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4" id="faqContainer"></div>

        <div className="text-center mt-12 p-6  ">
            <p className="text-gray-700 mb-3">
                <i className="fas fa-question-circle text-[#0F766E] text-2xl"></i>
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? We're here to help!
            </p>
            <button className="bg-[#0F766E] text-white px-6 py-2 rounded-lg hover:bg-[#134E4A] transition duration-300 font-semibold shadow-md">
                <i className="fas fa-envelope mr-2"></i>Contact Us
            </button>
        </div>
    </div>
</section>
</>
    )
}