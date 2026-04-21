const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: "user_id",
      otherKey: "role_id",
    });
    User.hasMany(models.UserClaim, { foreignKey: "user_id" });
    User.hasMany(models.UserToken, { foreignKey: "user_id" });
    User.hasMany(models.RefreshToken, { foreignKey: "user_id" });
    User.hasOne(models.Patient, { foreignKey: "user_id" });
    User.hasOne(models.Doctor, { foreignKey: "user_id" });
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      FirstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "first_name",
      },
      LastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "last_name",
      },
      Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: "email",
      },
      PasswordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash",
      },
      PhoneNumber: { type: DataTypes.STRING(20), field: "phone_number" },
      AccessFailedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "access_failed_count",
      },
      EmailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "email_confirmed",
      },
      LockoutEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "lockout_enabled",
      },
      CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      Status: {
        type: DataTypes.ENUM("active", "suspended", "deleted"),
        defaultValue: "active",
        field: "status",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    },
  );
  return User;
};
