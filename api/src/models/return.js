module.exports = function (sequelize, DataTypes) {
  const Return = sequelize.define('Return', {
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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    returnTime: {
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
    tableName: 'returns',
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
        name: 'returns_saleId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'returns_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'returns_paymentMethodId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'paymentMethodId' }
        ]
      }
    ]
  })

  Return.associate = function (models) {
    Return.belongsTo(models.sale, { as: 'sale', foreignKey: 'saleId'})
    Return.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId'})
    Return.belongsTo(models.paymentMethod, { as: 'paymentMethod', foreignKey: 'paymentMethodId'})

    Return.hasMany(models.Invoice, { as: 'Invoice', foreignKey: 'returnId'})
    Return.hasMany(models.ReturnDetail, { as: 'ReturnDetail', foreignKey: 'returnId'})
    Return.hasMany(models.ReturnError, { as: 'ReturnError', foreignKey: 'returnId'})
    Return.hasMany(models.Ticket, { as: 'Ticket', foreignKey: 'returnId'})
    Return.belongsToMany(models.Product, { through: models.ReturnDetail, as: 'products', foreignKey: 'returnId' })

  }

  return Return
}