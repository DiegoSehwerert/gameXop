module.exports = function (sequelize, DataTypes) {
  const EmailError = sequelize.define('EmailError', {
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
        notNull: {
          msg: 'Please provide a value for "customerId".',
        },
        isInt: {
          msg: 'Customer ID must be an integer.',
        },
      },
    },
    emailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "emailId".',
        },
        isInt: {
          msg: 'Email ID must be an integer.',
        },
      },
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "error".',
        },
        len: {
          args: [1, 1000],
          msg: 'Error message must be between 1 and 1000 characters.',
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      },
    },
  }, {
    sequelize,
    tableName: 'email_errors',
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
        name: 'email_errors_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' },
        ],
      },
      {
        name: 'email_errors_emailId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'emailId' },
        ],
      },
    ],
  });

  EmailError.associate = function (models) {
    EmailError.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId' });
    EmailError.belongsTo(models.email, { as: 'email', foreignKey: 'emailId' });
  };

  return EmailError;
};
