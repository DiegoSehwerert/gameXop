'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locale_seos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      languageAlias: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      description: {
        type: Sequelize.STRING, 
      },
      redirection: {
        defaultValue: 0,
        type: Sequelize.BOOLEAN, 
      },
      menu: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN, 
      },
      changeFrequency: {
        type: Sequelize.STRING, 
      },
      priority: {
        type: Sequelize.DECIMAL, 
      },
      sitemap: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN, 
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
    await queryInterface.dropTable('locale_seos')
  }
}