const { DataTypes, Model } = require('sequelize');
class Review extends Model {
  static associate(models) {
    Review.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    Review.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
  }
}

module.exports = (sequelize) => {
  Review.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'reviews_id' },
    PatientId: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    TreatmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    Rating: { type: DataTypes.INTEGER, allowNull: false, field: 'rating' },
    Description: { type: DataTypes.STRING(255), allowNull: false, field: 'description' },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
  }, { sequelize, tableName: 'reviews', timestamps: false });
  return Review;
};