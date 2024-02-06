module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlugRedirect = sequelize.define('LocaleSeoSlugRedirect', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the localeSeoSlugId.' },
        isInt: { msg: 'LocaleSeoSlugId must be an integer.' }
      }
    },
    languageAlias: {
      type: DataTypes.STRING,
      validate: {
        is: { args: /^[A-Za-z0-9_]+$/, msg: 'Invalid characters in languageAlias.' }
      }
    },
    oldUrl: {
      type: DataTypes.STRING,
      validate: {
        is: { args: /^(\/[A-Za-z0-9_-]+)+$/, msg: 'Invalid characters in oldUrl.' }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the creation date.' },
        isDate: { msg: 'Invalid date format for createdAt.' }
      },
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the update date.' },
        isDate: { msg: 'Invalid date format for updatedAt.' }
      },
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      }
    }
  }, {
    sequelize,
    tableName: 'locale_seo_slug_redirects',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'locale_seo_slug_redirects_localeSeoId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' }
        ]
      }
    ]
  });

  LocaleSeoSlugRedirect.associate = function (models) {
    LocaleSeoSlugRedirect.belongsTo(models.LocaleSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId'})
  }

  return LocaleSeoSlugRedirect;
};
