const { DataTypes, Model } = require("sequelize");

class Treatment extends Model {
  static associate(models) {
    Treatment.belongsTo(models.Department, { foreignKey: "department_id" });
    Treatment.hasMany(models.PatientTreatment, { foreignKey: "treatment_id" });
    Treatment.hasMany(models.InvoiceItem, { foreignKey: "treatment_id" });
    Treatment.hasMany(models.Review, { foreignKey: "treatment_id" });
    Treatment.belongsToMany(models.Inventory, {
      through: models.TreatmentInventory,
      foreignKey: "treatment_id",
      otherKey: "inventory_id",
    });
    Treatment.belongsToMany(models.Offer, {
      through: models.OfferTreatment,
      foreignKey: "treatment_id",
      otherKey: "offers_id",
    });
  }
}

module.exports = (sequelize) => {
  Treatment.init(
    {
      treatment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "treatment_id",
      },
      treatment_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "treatment_name",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "price",
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "description",
      },
      average_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "average_duration",
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "department_id",
      },
    },
    { sequelize, tableName: "treatments", timestamps: false },
  );
  return Treatment;
};
