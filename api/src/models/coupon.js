module.exports = function (sequelize, DataTypes) {
  const Coupon = sequelize.define('Coupon', {
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
          msg: 'Please provide a valid coupon name.'
        },
        notEmpty: {
          msg: 'Coupon name cannot be empty.'
        }
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a valid coupon code.'
        },
        notEmpty: {
          msg: 'Coupon code cannot be empty.'
        }
      }
    },
    percentage: {
      type: DataTypes.DECIMAL
    },
    multiplier: {
      type: DataTypes.DECIMAL
    },
    startsAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Please provide a valid start date.'
        }
      }
    },
    endsAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Please provide a valid end date.'
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
    tableName: 'coupons',
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

  Coupon.associate = function (models) {
    Coupon.hasMany(models.Sale, { as: 'Sale', foreignKey: 'couponId'})
  }

  return Coupon
};
