module.exports = function (sequelize, DataTypes) {
  const CustomerTracking = sequelize.define('CustomerTracking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER,
    },
    eventTime: {
      type: DataTypes.DOUBLE
    },
    eventName: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'customer_trackings',
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
        name: 'customer_trackings_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'customer_trackings_fingerprintId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoSlugId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' }
        ]
      }
    ]
  })

  CustomerTracking.associate = function (models) {
    CustomerTracking.belongsTo(models.customer, { as: 'customer', foreignKey: 'customerId'})
    CustomerTracking.belongsTo(models.fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId'})
    CustomerTracking.belongsTo(models.localeSeo, { as: 'localeSeo', foreignKey: 'localeSeoId'})
    CustomerTracking.belongsTo(models.localeSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId'})
  }

  return CustomerTracking
}