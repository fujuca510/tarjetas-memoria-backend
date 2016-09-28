const tarjeta = require('../models').tarjeta;
var util = require('util');

var service = {
  obtenerTodos: function() {
    return tarjeta.findAll();
  },

  obtenerPorId: function(tarjetaId) {
    return tarjeta.findById(tarjetaId);
  },

  crear: function(tarjetaObj) {
    return tarjeta.create(tarjetaObj);
  },

  eliminarPorId: function(tarjetaId) {
    return tarjeta.findById(tarjetaId).then(function(tarjeta) {
      if(tarjeta) {
        return tarjeta.destroy();
      } else {
        throw new Error(util.format('Tarjeta con id: %d, no existe', tarjetaId));
      }
    });
  },

  actualizarPorId: function(tarjetaId, tarjetaObj) {
    return tarjeta.findById(tarjetaId).then(function(resTarjeta) {
      if(resTarjeta) {
        resTarjeta.texto_referencia = tarjetaObj.texto_referencia || resTarjeta.texto_referencia;
        resTarjeta.texto_memoria = tarjetaObj.texto_memoria || resTarjeta.texto_memoria;
        resTarjeta.grupo = tarjetaObj.grupo || resTarjeta.grupo;
        return resTarjeta.save();
      } else {
        throw new Error(util.format('Tarjeta con id: %d, no existe', tarjetaId));
      }
    });
  }
};

module.exports = service;
