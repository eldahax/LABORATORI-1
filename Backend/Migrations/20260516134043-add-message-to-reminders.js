"use strict";

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "reminders",
      "message",
      {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "",
      }
    );

  },

  async down(queryInterface) {

    await queryInterface.removeColumn(
      "reminders",
      "message"
    );

  },

};