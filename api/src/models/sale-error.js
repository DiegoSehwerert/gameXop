module.exports = function (sequelize, DataTypes) {
  const SaleError = sequelize.define('SaleError', {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      errorCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      errorMessage: {
        type: DataTypes.STRING
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
    tableName: 'sale_errors',
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
        name: 'sale_errors_paymentMethodId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'paymentMethodId' }
        ]
      },
      {
        name: 'sale_errors_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'sale_errors_cartId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      }
    ]
  })

  SaleError.associate = function (models) {
    SaleError.belongsTo(models.paymentMethod, { as: 'paymentMethod', foreignKey: 'paymentMethodId'})
    SaleError.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId'})
    SaleError.belongsTo(models.cart, { as: 'cart', foreignKey: 'cartId'})
  }

  return SaleError
}