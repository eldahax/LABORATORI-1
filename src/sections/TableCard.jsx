export default function TableCard(){

    return(
        <>
           <h1 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-6">
      welcome ,emriUser-it!
    </h1>


    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-8">

      <div className="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p className="text-gray-500">Users</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F766E]">120</h2>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p className="text-gray-500">Doctors</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F766E]">8</h2>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p className="text-gray-500">Revenue</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F766E]">$12,450</h2>
      </div>

    </div>
    </>
    )
}