const inventoryCrud = require("../cruds/inventoryCrud");

const add = async (req, res) => {
  
    const { item_name, category, cost, quantity, description } = req.body;

    const addInvent = await inventoryCrud.createInvent(
      item_name,
      category,
      cost,
      quantity,
      description
    );

  
};

const update = async (req, res) => {

    const updated = await inventoryCrud.updateInvent(
      req.params.id,
      req.body
    );

    res.json(updated);
 
};

const getAllInvent = async (req, res) => {
 
    const data = await inventoryCrud.getAll();
    res.json(data); 
  
};


const deleteI=async(req,res)=>{

    const result=await inventoryCrud.deleteInvent(req.params.id)
 res.json(result);
  
}

const getbyId=async(req,res)=>{
    
   
    const result=await inventoryCrud.getById(req.params.id,req.body)
 res.json(result);
  
}

module.exports = { add, update,getAllInvent, deleteI,getbyId};