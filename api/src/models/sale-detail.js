module.exports = function (sequelize, DataTypes) {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    localeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceDiscountId: {
      type: DataTypes.INTEGER,
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'sale_details',
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
        name: 'sale_details_saleId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'sale_details_productId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'sale_details_localeId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'sale_details_priceId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'sale_details_priceDiscountId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'priceDiscountId' }
        ]
      },
      {
        name: 'sale_details_taxId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      }
    ]
  })

  SaleDetail.associate = function (models) {
    SaleDetail.belongsTo(models.sale, { as: 'sale', foreignKey: 'saleId'})
    SaleDetail.belongsTo(models.product, { as: 'product', foreignKey: 'productId'})
    SaleDetail.belongsTo(models.locale, { as: 'locale', foreignKey: 'localeId'})
    SaleDetail.belongsTo(models.price, { as: 'price', foreignKey: 'priceId'})
    SaleDetail.belongsTo(models.priceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId'})
    SaleDetail.belongsTo(models.tax, { as: 'tax', foreignKey: 'taxId'})
  }

  return SaleDetail
}