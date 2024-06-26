module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('City', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "country".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "country".'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "name".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name".'
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
    tableName: 'cities',
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
        name: 'cities_countryId_fk',
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      },
    ]
  })

  City.associate = function (models) {
    City.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    
    City.hasMany(models.Company, { as: 'companies', foreignKey: 'cityId' })
    City.hasMany(models.Fingerprint, { as: 'fingerprints', foreignKey: 'cityId' })
  }

  return City
}