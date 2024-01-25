module.exports = function (sequelize, DataTypes) {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Customer ID must be an integer.' },
        notNull: { msg: 'Please provide the Customer ID.' }
      }
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Sale ID must be an integer.' },
        notNull: { msg: 'Please provide the Sale ID.' }
      }
    },
    returnId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: 'Return ID must be an integer.' }
      }
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the reference.' }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the path.' }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the creation date.' },
        isDate: { msg: 'Invalid date format for createdAt.' }
      },
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide the update date.' },
        isDate: { msg: 'Invalid date format for updatedAt.' }
      },
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      }
    }
  }, {
    sequelize,
    tableName: 'invoices',
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
        name: 'invoices_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'invoices_saleId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'invoices_returnId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'returnId' }
        ]
      }
    ]
  });

  Invoice.associate = function (models) {
    Invoice.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId' });
    Invoice.belongsTo(models.sale, { as: 'sale', foreignKey: 'saleId' });
    Invoice.belongsTo(models.return, { as: 'return', foreignKey: 'returnId' });
  };

  return Invoice;
};
