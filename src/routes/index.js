const { Router } = require('express');

const createTokenRoute = require('./createToken');
const getBoletaRoute = require('./boleta.route');
const statusPago = require('./statusPago');

const router = Router();

router.use('/token', createTokenRoute);
router.use('/boleta', getBoletaRoute);
router.use('/statusPago', statusPago);

module.exports = router;

//! usar joi para validar los datos