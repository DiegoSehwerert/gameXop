module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlug = sequelize.define('LocaleSeoSlug', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the localeSeoId.' },
        isInt: { msg: 'LocaleSeoId must be an integer.' },
      },
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the languageAlias.' },
        is: { args: /^[A-Za-z0-9_]+$/, msg: 'Invalid characters in languageAlias.' },
      },
    },
    relParent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the relParent.' },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the slug.' },
      },
    },
    key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the key.' },
        isInt: { msg: 'Key must be an integer.' },
      },
    },
    parentSlug: {
      type: DataTypes.STRING,
      validate: {
        is: { args: /^(\/[A-Za-z0-9_-]+)+$/, msg: 'Invalid characters in parentSlug.' },
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
    keywords: {
      type: DataTypes.STRING,
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
    tableName: 'locale_seo_slugs',
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
      {
        name: 'locale_seo_slugs_localeSeoId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' },
        ],
      },
    ],
  });

  LocaleSeoSlug.associate = function (models) {
    LocaleSeoSlug.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' });

    LocaleSeoSlug.hasMany(models.CustomerTracking, { as: 'CustomerTracking', foreignKey: 'localeSeoSlugId' });
    LocaleSeoSlug.hasMany(models.LocaleSeoSlugRedirect, { as: 'LocaleSeoSlugRedirect', foreignKey: 'localeSeoSlugId' });
    LocaleSeoSlug.hasMany(models.MenuItem, { as: 'MenuItem', foreignKey: 'localeSeoSlugId' });
    LocaleSeoSlug.hasMany(models.PageTracking, { as: 'PageTracking', foreignKey: 'localeSeoSlugId' });
  };

  return LocaleSeoSlug;
};
