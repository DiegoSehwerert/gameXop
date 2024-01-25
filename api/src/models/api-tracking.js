module.exports = function (sequelize, DataTypes) {
  const ApiTracking = sequelize.define('ApiTracking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Please provide a valid customer ID.'
        }
      }
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Please provide a valid fingerprint ID.'
        }
      }
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: {
          msg: 'Please provide a valid IP address.'
        }
      }
    },
    isRobot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: {
          msg: 'Please specify if it is a robot using a boolean value.'
        }
      }
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a resource.'
        }
      }
    },
    resourceElement: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Please provide a valid resource element ID.'
        }
      }
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a method.'
        }
      }
    },
    httpCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid HTTP code.'
        }
      }
    },
    message: {
      type: DataTypes.TEXT
    },
    startTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Please provide a valid start time.'
        }
      }
    },
    endTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Please provide a valid end time.'
        }
      }
    },
    latencyMS: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Please provide a valid latency in milliseconds.'
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
    tableName: 'api_trackings',
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
        name: 'api_trackings_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'api_trackings_fingerprintId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      }
    ]
  })

  ApiTracking.associate = function (models) {
    ApiTracking.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId'})
    ApiTracking.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId'})
  }

  return ApiTracking
}
