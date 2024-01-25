module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('City', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid country ID.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a city name.'
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
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      }
    ]
  });

  City.associate = function (models) {
    City.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId'});

    City.hasMany(models.Company, { as: 'Company', foreignKey: 'cityId'});
    City.hasMany(models.Customer, { as: 'Customer', foreignKey: 'cityId'});
    City.hasMany(models.Fingerprint, { as: 'Fingerprint', foreignKey: 'cityId'});
  }

  return City;
};
