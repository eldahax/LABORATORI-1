'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    
    await queryInterface.addColumn('payments', 'stripe_session_id', {
      type: Sequelize.STRING,
      allowNull: true
    });

    
    await queryInterface.addColumn('payments', 'status', {
      type: Sequelize.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending'
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('payments', 'stripe_session_id');
    await queryInterface.removeColumn('payments', 'status');

  }
};