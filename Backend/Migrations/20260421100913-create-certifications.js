'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certifications', {
      certification_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      certification_type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      certification_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      certification_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      organization: {
        type: Sequelize.STRING(100),
        allowNull: false
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('certifications');
  }
};