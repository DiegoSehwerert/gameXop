module.exports = function (sequelize, DataTypes) {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    featured: {
      type: DataTypes.BOOLEAN
    },
    visible: {
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
    tableName: 'product_categories',
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
        name: 'product_category_relations_productId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'product_category_relations_productCategoryId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'productCategoryId' }
        ]
      }
    ]
  })

  ProductCategory.associate = function (models) {
    ProductCategory.hasMany(models.ProductCategoryRelation, { as: 'productCategoryRelations', foreignKey: 'productCategoryId'})
    // ProductCategory.belongsToMany(models.Product, { through: models.ProductCategoryRelation, as: 'products', foreignKey: 'productCategoryId' })
  }

  return ProductCategory
}