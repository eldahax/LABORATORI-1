import Bform from './BookForm'
export default function Book() {
  return (
    <section className="w-[100%] min-h-[80vh] mx-auto flex justify-center items-center flex-col md:flex-row bg-white pt-16">
      <div className="w-full h-full mx-auto">
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
      <Bform></Bform>
       
        </div>
      </div>
    </section>
  );
}
