module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageConfigurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID de Configuración de Imagen".',
        },
        isInt: {
          msg: 'El campo "ID de Configuración de Imagen" debe ser un número entero.',
        },
      },
    },
    entityId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'El campo "ID de Entidad" debe ser un número entero.',
        },
      },
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Entidad".',
        },
        isString: {
          msg: 'El campo "Entidad" debe ser una cadena de texto.',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isString: {
          msg: 'El campo "Nombre" debe ser una cadena de texto.',
        },
      },
    },
    originalFilename: {
      type: DataTypes.STRING,
      validate: {
        isString: {
          msg: 'El campo "Nombre de Archivo Original" debe ser una cadena de texto.',
        },
      },
    },
    resizedFilename: {
      type: DataTypes.STRING,
      validate: {
        isString: {
          msg: 'El campo "Nombre de Archivo Redimensionado" debe ser una cadena de texto.',
        },
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        isString: {
          msg: 'El campo "Título" debe ser una cadena de texto.',
        },
      },
    },
    alt: {
      type: DataTypes.STRING,
      validate: {
        isString: {
          msg: 'El campo "Texto Alternativo" debe ser una cadena de texto.',
        },
      },
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Alias de Idioma".',
        },
        isString: {
          msg: 'El campo "Alias de Idioma" debe ser una cadena de texto.',
        },
      },
    },
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Media Query".',
        },
        isString: {
          msg: 'El campo "Media Query" debe ser una cadena de texto.',
        },
      },
    },
    latencyMs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Latencia en milisegundos".',
        },
        isInt: {
          msg: 'El campo "Latencia en milisegundos" debe ser un número entero.',
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Fecha de Creación".',
        },
        isDate: {
          msg: 'El campo "Fecha de Creación" debe ser una fecha válida.',
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
        notNull: {
          msg: 'Por favor, rellena el campo "Fecha de Actualización".',
        },
        isDate: {
          msg: 'El campo "Fecha de Actualización" debe ser una fecha válida.',
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
    tableName: 'images',
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
        name: 'images_imageConfigurationId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'imageConfigurationId' },
        ],
      },
      {
        name: 'images_entityId_entity_mediaQuery_index',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'entityId' },
          { name: 'entity' },
          { name: 'mediaQuery' },
        ],
      },
    ],
  });

  Image.associate = function (models) {
    Image.belongsTo(models.ImageConfiguration, { as: 'imageConfiguration', foreignKey: 'imageConfigurationId' });
  };

  return Image;
};
