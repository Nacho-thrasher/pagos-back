const router = require('express').Router();
const { getBoleta } = require('../controllers/boleta');
const { buildCheckFunction } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['query']);
const { validarCampos } = require('../middlewares/validarCampos.js');

router.get('/',
    [ 
        checkBodyAndQuery('nroTran', 'El parámetro nroTran no puede ser nulo o vacío.')
        .not().isEmpty(),
        validarCampos 
    ], 
    getBoleta
);

module.exports = router;