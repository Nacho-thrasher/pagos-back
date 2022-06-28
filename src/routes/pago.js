const router = require('express').Router();
const { validarMovims } = require('../middlewares/validarMovims');
const { getStatusPago, ejecutarPago } = require('../controllers/pago');

router.get('/', [ validarMovims ], getStatusPago);
router.post('/', ejecutarPago);

module.exports = router;