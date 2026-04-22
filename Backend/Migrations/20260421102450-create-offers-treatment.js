'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offers_treatment', {
      offers_treatment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      offers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'offers_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      treatment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'treatments',
          key: 'treatment_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('offers_treatment');
  }
};