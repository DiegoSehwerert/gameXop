module.exports = function (sequelize, DataTypes) {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.INTEGER,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
    },
    couponId: {
      type: DataTypes.INTEGER,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalBasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalTaxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    saleDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    saleTime: {
      type: DataTypes.TIME,
      allowNull: false
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
    tableName: 'sales',
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
        name: 'sales_cartId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'sales_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'sales_paymentMethodId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'paymentMethodId' }
        ]
      },
      {
        name: 'sales_couponId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'couponId' }
        ]
      }
    ]
  })

  Sale.associate = function (models) {
    Sale.belongsTo(models.cart, { as: 'cart', foreignKey: 'cartId'})
    Sale.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId'})
    Sale.belongsTo(models.paymentMethod, { as: 'paymentMethod', foreignKey: 'paymentMethodId'})
    Sale.belongsTo(models.coupon, { as: 'coupon', foreignKey: 'couponId'})

    Sale.hasMany(models.Invoice, { as: 'Invoice', foreignKey: 'saleId'})
    Sale.hasMany(models.Return, { as: 'Return', foreignKey: 'saleId'})
    Sale.hasMany(models.SaleDetail, { as: 'SaleDetail', foreignKey: 'saleId'})
    Sale.hasMany(models.Ticket, { as: 'Ticket', foreignKey: 'saleId'})
    Sale.belongsToMany(models.Product, { through: models.SaleDetail, as: 'products', foreignKey: 'saleId' })
  }

  return Sale
}