var express = require('express');
var router = express.Router();

var tarjetaService = require('../services/tarjetaService');

/**
* GET tarjetas -> obtiene la lista de tarjetas.
* @name /api/v1/tarjetas
*/
router.get('/', (req, res) => {
  tarjetaService.obtenerTodos()
    .then((tarjetas) => res.json(tarjetas))
    .catch((error) => {
      console.log(error.stack);
      res.status(500).json({mensaje: 'Error en obtener tarjetas'});
    });
});

/**
* GET tarjetas/:id -> Obtiene el objeto tarjeta por ID
* @name /api/v1/tarjetas/:id,  donde :id es el identificador de la tarjeta
*/
router.get('/:id', (req, res) => {
  var tarjetaId = req.params.id;
  tarjetaService.obtenerPorId(tarjetaId)
    .then((tarjeta) => {
      if(tarjeta)
        res.json(tarjeta)
      else
        res.status(403).json({mensaje: 'Tarjeta no existe'});
    })
    .catch((error) => {
      console.log(error.stack);
      res.status(500).json({mensaje: 'Error en obtener tarjeta'});
    });
});

/**
* POST tarjetas -> Servicio para crear una tarjeta
* @name /api/v1/tarjetas
* Parametros del servicio en el cuerpo de la petición
* {
  	"texto_referencia":"CIENTIFICO",
  	"texto_memoria":"SCIENTIST",
  	"grupo":"INGLES-PROFESIONES"
* }
*/
router.post('/', (req, res) => {
  var objeto = {
    texto_referencia: req.body.texto_referencia,
    texto_memoria: req.body.texto_memoria,
    grupo: req.body.grupo
  }
  tarjetaService.crear(objeto)
    .then((tarjetaNueva) => res.json(tarjetaNueva))
    .catch((error) => {
      console.log(error.stack);
      res.status(500).json({mensaje: 'Error en registrar tarjeta'})
    });
});

/**
* PUT tarjetas/:id -> Servicio para actualizar una tarjeta, por identificador de la tarjeta
* @name /api/v1/tarjetas/:id, donde :id es el identificador de la tarjeta
* Parametros del servicio en el cuerpo de la petición
* {
  	"texto_referencia":"CIENTIFICO",
  	"texto_memoria":"SCIENTIST",
  	"grupo":"INGLES-PROFESIONES"
* }
*/
router.put('/:id', (req, res) => {
  var tarjetaId = req.params.id;
  var objeto = {
    texto_referencia: req.body.texto_referencia,
    texto_memoria: req.body.texto_memoria,
    grupo: req.body.grupo
  }
  tarjetaService.actualizarPorId(tarjetaId, objeto)
    .then((tarjetaNueva) => res.json(tarjetaNueva))
    .catch((error) => {
      console.log(error.stack);
      res.status(500).json({mensaje: 'Error en actualizar tarjeta'})
    });
});

/**
* DELETE tarjetas/:id -> Servicio para eliinar una tarjeta, por identificador de la tarjeta
* @name /api/v1/tarjetas/:id, donde :id es el identificador de la tarjeta
* Nota el valor de :id, solo acepta números ver validación con expresión regular ([0-9]+)
*/
router.delete('/:id([0-9]+)', (req, res) => {
  var tarjetaId = req.params.id;
  tarjetaService.eliminarPorId(tarjetaId)
    .then((tarjetaEliminada) => res.json(tarjetaEliminada))
    .catch((error) => {
      console.log(error.stack);
      res.status(500).json({mensaje: 'Error en eliminar tarjeta'})
    });
});

module.exports = router;
