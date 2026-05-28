const { DataTypes, Model } = require('sequelize');

class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.Invoice, { foreignKey: 'invoice_id' });
  }
}

module.exports = (sequelize) => {
  Payment.init({
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'payment_id'
    },

    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'invoice_id'
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'amount'
    },

    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'payment_date'
    },

    payment_method: {
      type: DataTypes.ENUM('cash', 'card', 'insurance'),
      allowNull: false,
      field: 'payment_method'
    },

  
    stripe_session_id: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'stripe_session_id'
    },

    status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending',
      field: 'status'
    }

  }, {
    sequelize,
    tableName: 'payments',
    timestamps: false
  });

  return Payment;
};