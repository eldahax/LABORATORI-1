export default function TableCard(){

    return(
        <>
           <h1 class="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-6">
      welcome ,emriUser-it!
    </h1>


    <div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-8">

      <div class="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p class="text-gray-500">Users</p>
        <h2 class="text-xl sm:text-2xl font-bold text-[#0F766E]">120</h2>
      </div>

      <div class="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p class="text-gray-500">Doctors</p>
        <h2 class="text-xl sm:text-2xl font-bold text-[#0F766E]">8</h2>
      </div>

      <div class="bg-white p-5 sm:p-6 rounded-xl shadow text-center flex-1 min-w-[200px]">
        <p class="text-gray-500">Revenue</p>
        <h2 class="text-xl sm:text-2xl font-bold text-[#0F766E]">$12,450</h2>
      </div>

    </div>
    </>
    )
}