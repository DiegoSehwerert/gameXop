module.exports = function (sequelize, DataTypes) {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid product ID.'
        }
      }
    },
    localeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid locale ID.'
        }
      }
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid price ID.'
        }
      }
    },
    priceDiscountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Please provide a valid price discount ID.'
        }
      }
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid tax ID.'
        }
      }
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a product name.'
        }
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Please provide a valid base price.'
        }
      }
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2),
      validate: {
        isDecimal: {
          msg: 'Please provide a valid tax price.'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid quantity.'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      }
    }
  }, {
    sequelize,
    tableName: 'cart_details',
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
        name: 'cart_details_cartId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'cart_details_productId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'cart_details_localeId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'cart_details_priceId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'cart_details_price_discountId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'price_discountId' }
        ]
      },
      {
        name: 'cart_details_taxId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      }
    ]
  })

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId'})
    CartDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId'})
    CartDetail.belongsTo(models.Locale, { as: 'locale', foreignKey: 'localeId'})
    CartDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId'})
    CartDetail.belongsTo(models.PriceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId'})
    CartDetail.belongsTo(models.Tax, { as: 'tax', foreignKey: 'taxId'})

    CartDetail.hasMany(models.Product, { as: 'Product', foreignKey: 'cartDetailId'})
  }

  return CartDetail
}
