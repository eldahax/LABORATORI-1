'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dental_records', {
      dental_record_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'patient_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'doctor_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      appointment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'appointments',
          key: 'appointment_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tooth: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      dental_condition: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      record_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dental_records');
  }
};