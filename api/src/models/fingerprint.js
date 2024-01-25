module.exports = function (sequelize, DataTypes) {
  const Fingerprint = sequelize.define('Fingerprint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Ciudad".',
        },
      },
    },
    dialCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Prefijo telefónico".',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Nombre".',
        },
        is: {
          args: /^[a-zA-Z0-9\sáéíóúüñÁÉÍÓÚÜÑ]+$/,
          msg: 'Por favor, rellena el campo "Nombre" con un nombre válido, sin caracteres especiales.',
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Apellido".',
        },
        is: {
          args: /^[a-zA-Z0-9\sáéíóúüñÁÉÍÓÚÜÑ]+$/,
          msg: 'Por favor, rellena el campo "Apellido" con un apellido válido, sin caracteres especiales.',
        },
      },
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Teléfono".',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Email".',
        },
        isEmail: {
          msg: 'Por favor, rellena el campo "Email" con un email válido.',
        },
      },
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Código Postal".',
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Contraseña".',
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'El campo "Fecha de Creación" debe ser una fecha válida.',
        },
        notNull: {
          msg: 'Por favor, rellena el campo "Fecha de Creación".',
        },
      },
      get() {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'El campo "Fecha de Actualización" debe ser una fecha válida.',
        },
        notNull: {
          msg: 'Por favor, rellena el campo "Fecha de Actualización".',
        },
      },
      get() {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null;
      },
    },
  }, {
    sequelize,
    tableName: 'fingerprints',
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
      {
        name: 'fingerprints_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' },
        ],
      },
      {
        name: 'fingerprints_cityId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cityId' },
        ],
      },
    ],
  });

  Fingerprint.associate = function (models) {
    Fingerprint.belongsTo(models.city, { as: 'city', foreignKey: 'cityId' });
    Fingerprint.belongsTo(models.dialCode, { as: 'dialCode', foreignKey: 'dialCodeId' });

    Fingerprint.hasMany(models.ApiTracking, { as: 'apiTracking', foreignKey: 'fingerprintId' });
    Fingerprint.hasMany(models.Cart, { as: 'Cart', foreignKey: 'fingerprintId' });
    Fingerprint.hasMany(models.Contact, { as: 'Contact', foreignKey: 'fingerprintId' });
    Fingerprint.hasMany(models.CustomerTracking, { as: 'CustomerTracking', foreignKey: 'fingerprintId' });
    Fingerprint.hasMany(models.PageTracking, { as: 'PageTracking', foreignKey: 'fingerprintId' });
  };

  return Fingerprint;
};
