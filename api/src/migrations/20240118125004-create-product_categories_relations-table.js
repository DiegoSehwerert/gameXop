'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products_category_relations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      references: {
        model: 'products_categories', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la columna referenciada
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      references: {
        model: 'products', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la columna referenciada
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
    await queryInterface.dropTable('products_category_relations')
  }
}