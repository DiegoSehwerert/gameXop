module.exports = function (sequelize, DataTypes) {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a country name.'
        },
        notEmpty: {
          msg: 'Country name cannot be empty.'
        }
      }
    },
    iso2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a valid ISO2 code.'
        },
        notEmpty: {
          msg: 'ISO2 code cannot be empty.'
        }
      }
    },
    iso3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a valid ISO3 code.'
        },
        notEmpty: {
          msg: 'ISO3 code cannot be empty.'
        }
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'countries',
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
  });

  Country.associate = function (models) {
    Country.hasMany(models.City, { as: 'city', foreignKey: 'countryId'})
    Country.hasMany(models.Company, { as: 'companies', foreignKey: 'countryId'})
    Country.hasMany(models.Customer, { as: 'customer', foreignKey: 'countryId' })
    Country.hasMany(models.DialCode, { as: 'dialCode', foreignKey: 'countryId'})
    Country.hasMany(models.Tax, { as: 'Tax', foreignKey: 'countryId'})
  }

  return Country;
};
