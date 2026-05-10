const {Department}=require("../models/index");

const addD=async(department_name,department_description)=>{
const exist=await Department.findOne({where:{department_name}});
if(exist){
    throw new Error("this department already exists");
}
const createDep=await Department.create({department_name});

return { message: "department created successfully" };
}

const getDepartment=async(department_id)=>{

    const res = await Department.findByPk(department_id, {
  attributes: ["department_id", "department_name"]
});
    return res;
}


const updateDep=async(department_id,data)=>{
  const find=await Department.findByPk(department_id);
  if(!find){
    throw new Error("department not found");
  }
  
  const upd=await Department.update({
    department_name:data.department_name
},{
    where:{department_id}
});

return { message: "department updated successfully" };
}

const getAll=async()=>{
    return await Department.findAll({
        attributes:["department_id","department_name"]
    });
}


const deleDep=async(department_id)=>{
    return await Department.destroy({where:{department_id}})
}

module.exports={
    addD,
    updateDep,
    getAll,
    getDepartment,
    deleDep
};
