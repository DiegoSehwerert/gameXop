module.exports = function (sequelize, DataTypes) {
  const LocaleSeo = sequelize.define('LocaleSeo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the languageAlias.' },
        is: { args: /^[A-Za-z0-9_]+$/, msg: 'Invalid characters in languageAlias.' },
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the URL.' },
        is: { args: /^(\/[A-Za-z0-9_-]+)+$/, msg: 'Invalid characters in URL.' },
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the title.' },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    redirection: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      validate: {
        isBoolean: { msg: 'Redirection must be a boolean.' },
      },
    },
    menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      validate: {
        isBoolean: { msg: 'Menu must be a boolean.' },
      },
    },
    changeFrequency: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.DECIMAL,
    },
    sitemap: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      validate: {
        isBoolean: { msg: 'Sitemap must be a boolean.' },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the creation date.' },
        isDate: { msg: 'Invalid date format for createdAt.' },
      },
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the update date.' },
        isDate: { msg: 'Invalid date format for updatedAt.' },
      },
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      },
    },
  }, {
    sequelize,
    tableName: 'locale_seos',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
    ],
  });

  LocaleSeo.associate = function (models) {
    LocaleSeo.hasMany(models.CustomerTracking, { as: 'CustomerTracking', foreignKey: 'localeSeoId' });
    LocaleSeo.hasMany(models.LocaleSeoRedirect, { as: 'LocaleSeoRedirect', foreignKey: 'localeSeoId' });
    LocaleSeo.hasMany(models.LocaleSeoSlug, { as: 'LocaleSeoSlug', foreignKey: 'localeSeoId' });
    LocaleSeo.hasMany(models.MenuItem, { as: 'MenuItem', foreignKey: 'localeSeoId' });
    LocaleSeo.hasMany(models.PageTracking, { as: 'PageTracking', foreignKey: 'localeSeoId' });
  };

  return LocaleSeo;
};
