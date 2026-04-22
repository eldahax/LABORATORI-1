'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medical_history', {
      history_id: {
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
      condition_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      diagnosed_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medical_history');
  }
};