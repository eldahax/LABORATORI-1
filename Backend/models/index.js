const  sequelize  = require('../config/database');

const User = require('../Modules/User')(sequelize);
const Role = require('../Modules/Role')(sequelize);
const Patient = require('../Modules/Patient')(sequelize);
const Doctor = require('../Modules/Doctor')(sequelize);
const UserRole = require('../Modules/UserRole')(sequelize);
const UserClaim = require('../Modules/UserClaim')(sequelize);

const db = {
  User, Role, Patient, Doctor, sequelize
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;