const { DataTypes, Model } = require('sequelize');
class Review extends Model {
  static associate(models) {
    Review.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    Review.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
  }
}

module.exports = (sequelize) => {
  Review.init({
    reviews_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'reviews_id' },
    patient_id: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    treatment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    rating: { type: DataTypes.INTEGER, allowNull: false, field: 'rating' },
    description: { type: DataTypes.STRING(255), allowNull: false, field: 'description' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
  }, { sequelize, tableName: 'reviews', timestamps: false });
  return Review;
};