module.exports = function (sequelize, DataTypes) {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "subject".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "subject".'
        }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "path".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "path".'
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
    tableName: 'emails',
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
      }
    ]
  })

  Email.associate = function (models) {
    Email.hasMany(models.EmailError, { as: 'emailErrors', foreignKey: 'emailId' })
    Email.hasMany(models.SentEmail, { as: 'sentEmails', foreignKey: 'emailId' })
  }

  return Email
}