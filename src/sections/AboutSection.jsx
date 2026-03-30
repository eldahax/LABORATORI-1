

const AboutSection = (props) => {
    return (
        <section className="py-16 pt-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="grid grid-cols-2 gap-4">
                        <img src={props.img1} className="rounded-2xl object-cover h-60 w-full shadow-lg hover:scale-105 transition" alt="Klinika 1" />
                        <img src={props.img2} className="rounded-2xl object-cover h-60 w-full shadow-lg hover:scale-105 transition" alt="Klinika 2" />
                        <img src={props.img3} className="rounded-2xl object-cover h-60 w-full shadow-lg hover:scale-105 transition" alt="Klinika 3" />
                        <img src={props.img4} className="rounded-2xl object-cover h-60 w-full shadow-lg hover:scale-105 transition" alt="Klinika 4" />
                    </div>

                    <div>
                        <p className="text-[#0F766E] font-semibold mb-2">{props.subtitle}</p>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{props.title}</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {props.description}
                        </p>


                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-[#0F766E] rounded-full"></span>
                                <p className="text-gray-700 font-medium">{props.feature1}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-[#0F766E] rounded-full"></span>
                                <p className="text-gray-700 font-medium">{props.feature2}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-[#0F766E] rounded-full"></span>
                                <p className="text-gray-700 font-medium">{props.feature3}</p>
                            </div>
                        </div>

                        <button className="mt-6 px-6 py-3 bg-[#0F766E] text-white rounded-xl shadow-lg hover:bg-[#115e59] transition transform hover:scale-105">
                            {props.buttonText}
                        </button>
                    </div>
                </div>


                <div className="my-20 border-t border-gray-100"></div>


            </div>
        </section>
    );
};

export default AboutSection;