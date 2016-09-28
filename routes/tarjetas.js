var express = require('express');
var router = express.Router();

var tarjetaService = require('../services/tarjetaService');

/* GET users listing. */
router.get('/', (req, res) => {
  tarjetaService.obtenerTodos()
    .then((tarjetas) => res.json(tarjetas))
    .catch((error) => res.status(500).json({mensaje: 'Error en obtener tarjetas'}));
});

router.get('/:id', (req, res) => {
  var tarjetaId = req.params.id;
  tarjetaService.obtenerPorId(tarjetaId)
    .then((tarjeta) => {
      if(tarjeta)
        res.json(tarjeta)
      else
        res.status(403).json({mensaje: 'Tarjeta no existe'});
    })
    .catch((error) => res.status(500).json({mensaje: 'Error en obtener tarjeta'}));
});

router.post('/', (req, res) => {
  var objeto = {
    texto_referencia: req.body.texto_referencia,
    texto_memoria: req.body.texto_memoria,
    grupo: req.body.grupo
  }
  tarjetaService.crear(objeto)
    .then((tarjetaNueva) => res.json(tarjetaNueva))
    .catch((error) => res.status(500).json({mensaje: 'Error en registrar tarjeta'}));
});

router.put('/:id', (req, res) => {
  var tarjetaId = req.params.id;
  var objeto = {
    texto_referencia: req.body.texto_referencia,
    texto_memoria: req.body.texto_memoria,
    grupo: req.body.grupo
  }
  tarjetaService.actualizarPorId(tarjetaId, objeto)
    .then((tarjetaNueva) => res.json(tarjetaNueva))
    .catch((error) => res.status(500).json({mensaje: 'Error en actualizar tarjeta'}));
});

router.delete('/:id([0-9]+)', (req, res) => {
  var tarjetaId = req.params.id;
  tarjetaService.eliminarPorId(tarjetaId)
    .then((tarjetaEliminada) => res.json(tarjetaEliminada))
    .catch((error) => res.status(500).json({mensaje: 'Error en eliminar tarjeta'}));
});

module.exports = router;
