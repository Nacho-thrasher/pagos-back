const { Router } = require('express');

const token_route = require('./token_route');
const boleta_route = require('./boleta_route');
const pago_route = require('./pago_route');

const router = Router();

router.use('/token', token_route);
router.use('/boleta', boleta_route);
router.use('/status_pago', pago_route);

module.exports = router;

//! usar joi para validar los datos