

const Revitalize = (props) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{props.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {props.description}
          </p>
          <ul className="space-y-3 font-medium text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-[#0F766E]">✔</span> {props.feat1}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0F766E]">✔</span> {props.feat2}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0F766E]">✔</span> {props.feat3}
            </li>
          </ul>
        </div>
        <div className="relative">
          <img
            src={props.image}
            className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
            alt="Dental Team"
          />
         
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0F766E]/10 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Revitalize;