'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      references: {
        model: 'image_configurations', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la columna referenciada
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      entityID:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      entity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      originalFileName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      resizedFileName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      languageAlias: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mediaQuery: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      latencyMS: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('images')
  }
}