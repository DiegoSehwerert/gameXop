module.exports = function (sequelize, DataTypes) {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "subject".',
        },
      },
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "path".',
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
    tableName: 'emails',
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
    ],
  });

  Email.associate = function (models) {
    Email.hasMany(models.EmailError, { as: 'EmailError', foreignKey: 'EmailId' });
    Email.hasMany(models.SentEmail, { as: 'SentEmail', foreignKey: 'emailId' });
    Email.belongsToMany(models.Customer, { through: models.SentEmail, as: 'customers', foreignKey: 'emailId' });
  };

  return Email;
};
