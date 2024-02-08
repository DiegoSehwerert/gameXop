module.exports = function (sequelize, DataTypes) {
  const DialCode = sequelize.define('DialCode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in the "Country" field.'
        }
      }
    },
    dialCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in the "Dial Code" field.'
        }
      }
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
    tableName: 'dial_codes',
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
        name: 'dial_codes_countryId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      }
    ]
  })

  DialCode.associate = function (models) {
    DialCode.belongsTo(models.Country, { as: 'Country', foreignKey: 'countryId'})

    DialCode.hasMany(models.Company, { as: 'Company', foreignKey: 'dialCodeId'})
    DialCode.hasMany(models.Customer, { as: 'Customer', foreignKey: 'dialCodeId' })
  }

  return DialCode
}
