'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('image_configurations', {
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
      entity: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      mediaQuery: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      widthPx : {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },
      heightPx : {
        allowNull: false,
        type: Sequelize.INTEGER, 
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
    await queryInterface.dropTable('image_configurations')
  }
}