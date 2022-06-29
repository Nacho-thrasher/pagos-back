const router = require('express').Router();
const { getStatusPago, ejecutarPago } = require('../controllers/pago');
const { buildCheckFunction } = require('express-validator')
const { validarMovims } = require('../middlewares/validarMovims');
const { validarCampos } = require('../middlewares/validarCampos.js');
const { validarMedioPago } = require('../middlewares/validarMedioPago');
const { validarCuotas } = require('../middlewares/validarCuotas');

const checkBodyAndQuery = buildCheckFunction(['body','query']);
router.get('/', 
    [ 
        checkBodyAndQuery('nroTran', 'El parámetro nroTran no puede ser nulo o vacío.').not().isEmpty(),
        validarCampos 
    ],
    getStatusPago
);
router.post('/', 
    [ 
        checkBodyAndQuery('nroTran', 'El parámetro nroTran no puede ser nulo o vacío.').not().isEmpty(),
        checkBodyAndQuery('paymentMethodId', 'El medio de pago no puede ser nulo o vacío.').not().isEmpty(),
        checkBodyAndQuery('installments', 'Cantidad de cuotas no puede ser nulo o vacío.').not().isEmpty(),
        checkBodyAndQuery('amount', 'El campo amount no puede ser nulo o vacío.').not().isEmpty(),
        validarCampos,
        validarMovims,
        validarMedioPago,
        validarCuotas,
        // validar transaccion en ges movim cod barra 2, ges decidir 
    ],
    ejecutarPago
);
//? req.body
// token;
// siteTransactionId;
// paymentMethodId;
// bin;
// cuotaId;

module.exports = router;