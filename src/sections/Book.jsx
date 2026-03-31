export default function Book() {
  return (
    <section className="w-[100%] min-h-[80vh] mx-auto flex justify-center items-center flex-col md:flex-row bg-white pt-16">

      <form className="w-full h-full mx-auto">
        <h1 className="text-center text-2xl md:text-[35px] font-bold tracking-widest mb-8">
          BOOK AN APPOINTMENT
        </h1>

        <div className="flex justify-center items-center w-full flex-col md:flex-row gap-10 h-full">

          <div className="flex justify-center items-center w-full md:w-1/2 flex-col  h-full">

            <h1 className="text-2xl md:text-[35px] text-center text-gray-500 mb-4">
              Working hours
            </h1>

            <table className="w-[90%] max-w-[450px] ">
              <tbody>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day, i) => (
                  <tr
                    key={i}
                    className="flex items-center justify-between border-b-2 w-full pb-5 mb-4"
                  >
                    <td>{day}</td>
                    <td className="flex items-center gap-2">
                      {day !== "Sunday" && "9:00-17:00"}
                      <img
                        src={
                          day !== "Sunday"
                            ? "https://img.icons8.com/?size=100&id=30468&format=png&color=000000"
                            : "https://img.icons8.com/?size=100&id=34903&format=png&color=000000"
                        }
                        alt=""
                        className="w-8 h-8 md:w-10 md:h-10"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-[60%] flex justify-center items-center flex-wrap mt-[60px]">

          
            <div className="w-full sm:w-[300px] md:w-[60%] p-2">
              <div className="flex flex-col">
                <label className="mb-1 font-bold text-black">First Name</label>
                <input
                  type="text"
                  placeholder="name"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label className="mb-1 font-bold text-black">Last Name</label>
                <input
                  type="text"
                  placeholder="last name"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

      
            <div className="w-full sm:w-[300px] md:w-[60%] p-2">
              <div className="flex flex-col">
                <label className="mb-1 font-bold text-black">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label className="mb-1 font-semibold text-black">Phone Number</label>
                <input
                  type="text"
                  placeholder="phone number"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

           
            <div className="w-full sm:w-[300px] md:w-[60%] p-2">
              <div className="flex flex-col">
                <label className="mb-1 font-bold text-black">Date and time</label>
                <input
                  type="datetime-local"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label className="mb-1 font-bold text-black">Reason</label>
                <input
                  type="text"
                  placeholder="reason"
                  className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="w-full text-center mt-4">
                <input
                  type="submit"
                  value="BOOK"
                  className="px-8 py-2 text-white bg-teal-700 font-bold shadow-md text-sm cursor-pointer rounded-md"
                />
              </div>
            </div>

          </div>
        </div>
      </form>
    </section>
  );
}