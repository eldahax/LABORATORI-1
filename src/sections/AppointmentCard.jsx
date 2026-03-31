const AppointmentCard = ({ patient, doctor, diagnosis, img }) => {
  return (
    <div className="w-[400px] h-[200px] border-2 rounded-[20px] p-[4px] flex">

      <div className="w-[40%] h-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[60%] space-y-3 py-[6px] px-[6px]">
        <h2 className="text-black font-medium text-[17px]">
          Appointment - Treatment
        </h2>
        <p className="text-gray-600 font-semibold text-[14px]">
          {patient}
        </p>
        <p className="text-gray-600 font-semibold text-[14px]">
          {doctor}
        </p>
        <p className="text-gray-600 font-semibold text-[14px]">
          {diagnosis}
        </p>
      </div>

    </div>
  );
};

export default AppointmentCard;