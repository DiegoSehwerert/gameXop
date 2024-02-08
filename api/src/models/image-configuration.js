module.exports = function (sequelize, DataTypes) {
  const ImageConfiguration = sequelize.define('ImageConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Entidad".',
        }
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Nombre".',
        }
      },
    },
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Media Query".',
        }
      },
    },
    widthPx: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'El campo "Ancho en píxeles" debe ser un número entero.',
        },
      },
    },
    heightPx: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'El campo "Alto en píxeles" debe ser un número entero.',
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
    tableName: 'image_configurations',
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
        name: 'image_configurations_entity_name_mediaQuery_index',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'entity' },
          { name: 'name' },
          { name: 'mediaQuery' },
        ],
      },
    ],
  });

  ImageConfiguration.associate = function (models) {
    ImageConfiguration.hasMany(models.Image, { as: 'Image', foreignKey: 'imageConfigurationId' });
  };

  return ImageConfiguration;
};
