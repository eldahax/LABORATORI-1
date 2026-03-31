
export default function Stats(props){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center max-w-7xl mx-auto mb-[30px]">
            <div>
                <h3 className="text-3xl font-bold text-[#0F766E]">{props.stat1Value}</h3>
                <p className="text-gray-600">{props.stat1Label}</p>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-[#0F766E]">{props.stat2Value}</h3>
                <p className="text-gray-600">{props.stat2Label}</p>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-[#0F766E]">{props.stat3Value}</h3>
                <p className="text-gray-600">{props.stat3Label}</p>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-[#0F766E]">{props.stat4Value}</h3>
                <p className="text-gray-600">{props.stat4Label}</p>
            </div>
        </div>
    );
};




