'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      percentage: {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },
      multiplier: {
        allowNull: false,
        type: Sequelize.DECIMAL, 
      },
      current: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      startsAs: {
        type: Sequelize.DATE,
      },
      endsAs: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('coupons')
  }
}