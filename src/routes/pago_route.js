const router = require('express').Router();

const { get_status_pago, ejecutar_pago } = require('../controllers/pago_controller');

router.get('/', get_status_pago);
router.post('/', ejecutar_pago);

module.exports = router;