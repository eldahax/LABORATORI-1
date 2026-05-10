const depCrud=require("../cruds/departentCrud");

const addDep=async(req,res)=>{
    try{
        const{department_name,department_description}=req.body;

        const add=await depCrud.addD(department_name,department_description);
        res.json(add);
    }
    catch (err) {
  
    res.status(500).json({ error: err.message });
  }
}

const getById=async(req,res)=>{
    try{

        const dep=await depCrud.getDepartment(req.params.id);
        res.json(dep);
    }catch (err) {
  
    res.status(500).json({ error: err.message });
  }
}

const update=async(req,res)=>{
    try{
       const up=await depCrud.updateDep(req.params.id,req.body);
       res.json(up);
    }
    catch (err) {
  
    res.status(500).json({ error: err.message });
  }
}

const deleDep=async(req,res)=>{
    try{
      const del=await depCrud.deleDep(req.params.id);
      res.json(del);
    }
    catch (err) {
  
    res.status(500).json({ error: err.message });
  }
}

const getAll=async(req,res)=>{
    try{
   const get=await depCrud.getAll();
   res.json(get);
    }
    catch (err) {
  
    res.status(500).json({ error: err.message });
  }
}

module.exports={
addDep,
getById,
update,
deleDep,
getAll
};