const crud=require("../cruds/appointmentCrud");


const createApp=async(req,res)=>{
    try{
     const{full_name,doctor,email,appointment_date_time,description}=req.body;

     const result=await crud.create(full_name,doctor,email,appointment_date_time,description);
      res.json(result);
    }
    catch(err){
    res.status(500).json({ error: err.message });
    }
}

const update=async(req,res)=>{
    try{
     const updateIt=await crud.updateAppointment(req.params.id,req.body);
     res.json(updateIt);
    }
    catch(err){
    res.status(500).json({ error: err.message });
    }
}


const deleteApp=async(req,res)=>{
    try{
     const del=await crud.deleteAppoint(req.params.id);
     res.json(del);
    }
    catch(err){
  res.status(400).json({ error: err.message });
    }
}


const getAll=async(req,res)=>{
    try{
   const all=await crud.getAllApp();
   res.json(all)
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}

const getById=async(req,res)=>{
    try{
        const get=await crud.getAppById(req.params.id);
        res.json(get);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}

module.exports={
    createApp,
    update,
    deleteApp,
    getAll,
    getById
}