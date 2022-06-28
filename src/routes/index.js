const { Router } = require('express');

const tokenRoute = require('./token');
const boletaRoute = require('./boleta');
const pagoRoute = require('./pago');

const router = Router();

router.use('/token', tokenRoute);
router.use('/boleta', boletaRoute);
router.use('/pago', pagoRoute);


module.exports = router;

//! usar joi para validar los datos