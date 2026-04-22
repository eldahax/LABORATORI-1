const  sequelize  = require('../config/database');

const User = require('../Modules/User')(sequelize);
const Role = require('../Modules/Role')(sequelize);
const Patient = require('../Modules/Patient')(sequelize);
const Doctor = require('../Modules/Doctor')(sequelize);
const Department = require('../Modules/Department')(sequelize);
const DoctorDepartment=require("../Modules/DoctorDepartment")(sequelize);
const Room = require('../Modules/Room')(sequelize);
const Treatment = require('../Modules/Treatment')(sequelize);
const Appointment = require('../Modules/Appointment')(sequelize);
const DentalRecord = require('../Modules/DentalRecord')(sequelize);
const PatientAllergy = require('../Modules/PatientAllergy')(sequelize);
const PatientTreatment = require('../Modules/PatientTreatment')(sequelize);
const Inventory = require('../Modules/Inventory')(sequelize);
const TreatmentInventory = require('../Modules/TreatmentInventory')(sequelize);
const Invoice = require('../Modules/Invoice')(sequelize);
const InvoiceItem = require('../Modules/InvoiceItem')(sequelize);
const Payment = require('../Modules/Payment')(sequelize);
const WorkSchedule = require('../Modules/WorkSchedule')(sequelize);
const Review = require('../Modules/Review')(sequelize);
const Offer = require('../Modules/Offer')(sequelize);
const OfferTreatment = require('../Modules/OfferTreatment')(sequelize);
const Insurance = require('../Modules/Insurance')(sequelize);
const MedicalHistory = require('../Modules/MedicalHistory')(sequelize);
const Reminder = require('../Modules/Reminder')(sequelize);
const Certification = require('../Modules/Certification')(sequelize);
const UserRole = require('../Modules/UserRole')(sequelize);
const UserClaim = require('../Modules/UserClaim')(sequelize);
const UserToken = require('../Modules/UserToken')(sequelize);
const RefreshToken = require('../Modules/RefreshToken')(sequelize);

const db = {
  User, Role, Patient, Doctor, Department,DoctorDepartment, Room, Treatment,
  Appointment, DentalRecord, PatientAllergy, PatientTreatment,
  Inventory, TreatmentInventory, Invoice, InvoiceItem, Payment,
  WorkSchedule, Review, Offer, OfferTreatment, Insurance,
  MedicalHistory, Reminder, Certification, UserRole, UserClaim,
  UserToken, RefreshToken, sequelize
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;