

export default  function Faq(){

    return(
        <>
        <section class="w-full  py-16 px-4 md:px-8">
    <div class="max-w-4xl mx-auto">
        
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#0F766E] mb-3">
                Frequently Asked Questions
            </h2>
            <p class="text-gray-600 text-lg">
                Everything you need to know about our services
            </p>
            <div class="w-20 h-1 bg-[#0F766E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="space-y-4" id="faqContainer"></div>

        <div class="text-center mt-12 p-6  ">
            <p class="text-gray-700 mb-3">
                <i class="fas fa-question-circle text-[#0F766E] text-2xl"></i>
            </p>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Still have questions?
            </h3>
            <p class="text-gray-600 mb-4">
                Can't find the answer you're looking for? We're here to help!
            </p>
            <button class="bg-[#0F766E] text-white px-6 py-2 rounded-lg hover:bg-[#134E4A] transition duration-300 font-semibold shadow-md">
                <i class="fas fa-envelope mr-2"></i>Contact Us
            </button>
        </div>
    </div>
</section>
</>
    )
}