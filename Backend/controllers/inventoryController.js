const inventoryCrud = require("../cruds/inventoryCrud");

const add = async (req, res) => {
    try {
        const { item_name, category, cost, quantity, description } = req.body;
        
        const addInvent = await inventoryCrud.createInvent(
            item_name,
            category,
            cost,
            quantity,
            description
        );
       
        return res.status(201).json(addInvent); 
    } catch (error) {
        console.error("Add Error:", error);
        return res.status(500).json({ error: "Failed to add item" });
    }
};

const update = async (req, res) => {
    try {
        const updated = await inventoryCrud.updateInvent(
            req.params.id,
            req.body
        );
       
        return res.status(200).json(updated);
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ error: "Failed to update item" });
    }
};

const getAllInvent = async (req, res) => {
    try {
        const data = await inventoryCrud.getAll();
        return res.status(200).json(data); 
    } catch (error) {
        console.error("Get All Error:", error);
        return res.status(500).json({ error: "Failed to fetch inventory" });
    }
};

const deleteI = async (req, res) => {
    try {
        const result = await inventoryCrud.deleteInvent(req.params.id);  
        return res.status(200).json({ message: "Deleted successfully", result });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ error: "Failed to delete item" });
    }
};

const getbyId = async (req, res) => {
    try {
        const result = await inventoryCrud.getById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error("Get By ID Error:", error);
        return res.status(500).json({ error: "Failed to fetch item" });
    }
};

module.exports = { add, update, getAllInvent, deleteI, getbyId };