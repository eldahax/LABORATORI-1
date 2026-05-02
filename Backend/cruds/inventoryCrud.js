const { Inventory, TreatmentInventory } = require("../models");

const createInvent = async (
  item_name,
  category,
  cost,
  quantity,
  description,
) => {
  return await Inventory.create({
    item_name,
    category,
    cost,
    quantity,
    description,
  });
};

const getAll = async () => {
  return await Inventory.findAll({
    attributes: ["inventory_id","item_name", "category", "cost", "quantity", "description"],
  });
};

const getById = async (inventory_id) => {
  return await Inventory.findByPk(inventory_id, {
    attributes: [
      "inventory_id",
      "item_name",
      "category",
      "cost",
      "quantity",
      "description",
    ],
  });
};

const updateInvent = async (inventory_id, data) => {
  const invent = await Inventory.findByPk(inventory_id);
  if (!invent) {
    throw new Error("inventory doesnt exist");
  }

   return await Inventory.update({
    item_name: data.item_name,
    category: data.category,
    cost: data.cost,
    quantity: data.quantity,
    description: data.description,
  }, {
    where: { inventory_id: inventory_id } 
  });
 
};

const deleteInvent = async (inventory_id) => {
  return await Inventory.destroy({ where: { inventory_id } });
};

module.exports = {
  createInvent,
  getAll,
  getById,
  updateInvent,
  deleteInvent
};