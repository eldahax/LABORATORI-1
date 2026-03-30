
const Mission = (props) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">

            <h3 className="font-semibold text-lg mb-2">
                {props.title}
            </h3>


            <p className="text-gray-600 mb-3">
                {props.description}
            </p>


            <div className="mt-auto">
                <a href="#" className="text-[#0F766E] font-medium hover:underline">
                    Learn More <span>→</span>
                </a>
            </div>
        </div>
    );
};

export default Mission;