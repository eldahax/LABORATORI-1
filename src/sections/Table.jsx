export default function Table(props){
    return(
       
            <div class="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
      <h1 class="text-lg sm:text-xl font-bold text-[#0F766E] mb-6">
        Appointments
      </h1>

      <table class="min-w-full text-left text-sm sm:text-base ">
        <thead className="[&>tr>th]:py-4">
          <tr class="border-b">
            <th class="py-2">Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr class="border-b hover:bg-gray-50">
            <td class="py-2">Elda</td>
            <td>Dr. Shpend Agusholli</td>
            <td>10 Apr</td>
            <td>
              <span class="bg-gray-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
                Pending
              </span>
            </td>
            <td class="flex flex-wrap gap-2">
              <button class="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg">
                Delete
              </button>
              <button class="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg">
                Update
              </button>
            </td>
          </tr>

          <tr class="border-b hover:bg-gray-50">
            <td class="py-2">Doan</td>
            <td>Dr. Shpend Agusholli</td>
            <td>11 Apr</td>
            <td>
              <span class="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
                Completed
              </span>
            </td>
            <td class="flex flex-wrap gap-2">
              <button class="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg">
                Delete
              </button>
              <button class="text-green-600 hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

     
    )
}