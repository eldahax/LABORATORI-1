import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function AddRoom() {
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [chairNumber, setChairNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [departments, setDep] = useState([]);

    const [roomErr, setRoomErr] = useState("");
    const [chairErr, setChairErr] = useState("");
    const [departmentErr, setDepartmentErr] = useState("");

    const [alert, setAlert] = useState({
        show:false,
        message:"",
        type:"success"
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/departments")
            .then(res => res.json())
            .then(data => setDep(data))
            .catch(() =>
                setAlert({
                    show:true,
                    message:"Failed loading departments",
                    type:"error"
                })
            );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setRoomErr("");
        setChairErr("");
        setDepartmentErr("");

        let hasError=false;

        if(!roomName.trim()){
            setRoomErr("Room name required");
            hasError=true;
        }

        if(!chairNumber || Number(chairNumber)<=0){
            setChairErr("Chair number >0");
            hasError=true;
        }

        if(!departmentId){
            setDepartmentErr("Department required");
            hasError=true;
        }

        if(hasError) return;

        try{

            const res=await fetch(
                "http://localhost:5000/api/rooms",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        room_name:roomName,
                        chair_number:Number(chairNumber),
                        department_id:Number(departmentId)
                    })
                }
            );

            const data=await res.json();

            if(!res.ok){

                setAlert({
                    show:true,
                    message:data.error || "Failed adding room",
                    type:"error"
                });

                return;
            }

            setAlert({
                show:true,
                message:"Room added successfully",
                type:"success"
            });

            setTimeout(()=>{
                navigate("/rooms")
            },1000)

        }catch{

            setAlert({
                show:true,
                message:"Server error",
                type:"error"
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4"
            >

                <CustomAlert
                    show={alert.show}
                    message={alert.message}
                    type={alert.type}
                    onClose={()=>
                        setAlert(p=>({
                            ...p,
                            show:false
                        }))
                    }
                />

                <input
                    placeholder="Room name"
                    value={roomName}
                    onChange={(e)=>setRoomName(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <p className="text-red-500">{roomErr}</p>

                <input
                    type="number"
                    placeholder="Chair number"
                    value={chairNumber}
                    onChange={(e)=>setChairNumber(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <p className="text-red-500">{chairErr}</p>

                <select
                    value={departmentId}
                    onChange={(e)=>setDepartmentId(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">
                        Select department
                    </option>

                    {departments.map(d=>(
                        <option
                            key={d.department_id}
                            value={d.department_id}
                        >
                            {d.department_name}
                        </option>
                    ))}

                </select>

                <p className="text-red-500">
                    {departmentErr}
                </p>

                <button className="w-full bg-teal-600 text-white p-2 rounded">
                    Add Room
                </button>

            </form>
        </div>
    );
}