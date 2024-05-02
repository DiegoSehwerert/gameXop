module.exports = function (sequelize, DataTypes) {
  const EmailError = sequelize.define('EmailError', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "customer".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "customer".'
        }
      }
    },
    emailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "email".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "email".'
        }
      }
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "error".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "error".'
        }
      }
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
    tableName: 'email_errors',
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
        name: 'email_errors_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'email_errors_emailId_fk',
        using: 'BTREE',
        fields: [
          { name: 'emailId' }
        ]
      }
    ]
  })

  EmailError.associate = function (models) {
    EmailError.belongsTo(models.Email, { as: 'email', foreignKey: 'emailId' })
  }

  return EmailError
}