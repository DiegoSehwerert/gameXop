'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('price-discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      references: {
        model: 'prices', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la columna referenciada
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      percentage:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      multiplier: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      current: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN,
      },
      startsAt: {
        type: Sequelize.DATE,
      },
      endsAt: {
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
    await queryInterface.dropTable('price-discounts')
  }
}