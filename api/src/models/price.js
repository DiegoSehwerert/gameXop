module.exports = function (sequelize, DataTypes) {
  const Price = sequelize.define('Price', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    taxId: {
      type: DataTypes.INTEGER,
    },
    basePrice: {
      type: DataTypes.DECIMAL
    },
    current: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'prices',
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
        name: 'prices_productId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'prices_taxId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      }
    ]
  })

  Price.associate = function (models) {
    Price.belongsTo(models.product, { as: 'product', foreignKey: 'productId'})
    Price.belongsTo(models.tax, { as: 'tax', foreignKey: 'taxId'})

    Price.hasMany(models.CartDetail, { as: 'CartDetail', foreignKey: 'priceId'})
    Price.hasMany(models.PriceDiscount, { as: 'PriceDiscount', foreignKey: 'priceId'})
    Price.hasMany(models.ReturnDetail, { as: 'ReturnDetail', foreignKey: 'priceId'})
    Price.hasMany(models.SaleDetail, { as: 'SaleDetail', foreignKey: 'priceId'})
  }

  return Price
}