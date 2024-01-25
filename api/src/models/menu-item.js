module.exports = function (sequelize, DataTypes) {
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the menuId.' },
      },
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER,
    },
    parent: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the name.' },
        len: { args: [1, 255], msg: 'Name must be between 1 and 255 characters.' },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [0, 255], msg: 'Description must be less than or equal to 255 characters.' },
      },
    },
    customUrl: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [0, 255], msg: 'Custom URL must be less than or equal to 255 characters.' },
      },
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the private status.' },
      },
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'menu_items',
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
        name: 'menu_items_menuId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'menuId' },
        ],
      },
      {
        name: 'menu_items_localeSeoId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' },
        ],
      },
      {
        name: 'menu_items_localeSeoSlugId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' },
        ],
      },
    ],
  });

  MenuItem.associate = function (models) {
    MenuItem.belongsTo(models.menu, { as: 'menu', foreignKey: 'menuId' });
    MenuItem.belongsTo(models.localeSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' });
    MenuItem.belongsTo(models.localeSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId' });
  };

  return MenuItem;
};
