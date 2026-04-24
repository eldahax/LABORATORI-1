import Table from "../sections/Table";
import TableCard from "../sections/TableCard";
import Navbar from "../components/Navbar";
import Sidebar from "../sections/sideBar";
import TablePatient from "../sections/TablePatient";


export default function Profile() {

    return (
        <>
            <Navbar></Navbar>
            <div className=' min-h-screen'>

                <div className="flex w-full min-h-screen mt-[50px]">

                    <Sidebar />

                    <div className="w-3/4 bg-gray-100 p-10  ml-[25%]">


                        <TableCard></TableCard>
                        <Table></Table>
                        <TablePatient></TablePatient>

                    </div>
                </div>

            </div>
        </>
    );
}