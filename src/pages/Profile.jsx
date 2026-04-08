import Table from "../sections/Table";
import TableCard from "../sections/TableCard";
import Navbar from "../components/Navbar";



export default function Profile (){

    return(
        <>
       <body class='bg-gray-100'>
        <Navbar></Navbar>
         <div class="max-w-7xl mx-auto p-7 sm:p-6 mt-[80px]">
            <TableCard></TableCard>
         <Table></Table>
         <Table></Table>
         <Table></Table>
         
         </div>
         
       </body>
        </>
    );
}