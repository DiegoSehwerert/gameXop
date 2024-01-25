module.exports = function (sequelize, DataTypes) {
  const Faq = sequelize.define('Faq', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'El campo "Orden" debe ser un número entero.',
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
    tableName: 'faqs',
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

  Faq.associate = function (models) {

  };

  return Faq;
};
