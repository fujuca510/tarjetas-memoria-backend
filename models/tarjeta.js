'use strict';
module.exports = function(sequelize, DataTypes) {
  var tarjeta = sequelize.define('tarjeta', {
    texto_referencia: {
      type: DataTypes.STRING,
      allowNull: false
    }
    texto_memoria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: DataTypes.STRING,
    grupo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return tarjeta;
};
