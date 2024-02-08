module.exports = function (sequelize, DataTypes) {
  const Locale = sequelize.define('Locale', {
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
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the entity.' },
        is: { args: /^[A-Za-z0-9_]+$/, msg: 'Invalid characters in entity.' },
      },
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the entityId.' },
      },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the key.' },
        is: { args: /^[A-Za-z0-9_]+$/, msg: 'Invalid characters in key.' },
      },
    },
    value: {
      type: DataTypes.TEXT,
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
    tableName: 'locales',
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
        name: 'locales_languageAlias_entity_entityId_key_index',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'languageAlias' },
          { name: 'entity' },
          { name: 'entityId' },
          { name: 'key' },
        ],
      },
    ],
  });

  Locale.associate = function (models) {
    Locale.hasMany(models.CartDetail, { as: 'cartDetail', foreignKey: 'localeId' });
    Locale.hasMany(models.ReturnDetail, { as: 'returnDetail', foreignKey: 'localeId' });
    Locale.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' });
  };

  return Locale;
};
