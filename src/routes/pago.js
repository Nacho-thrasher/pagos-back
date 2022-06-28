const router = require('express').Router();

const { getStatusPago, ejecutarPago } = require('../controllers/pago');

router.get('/', getStatusPago);
router.post('/', ejecutarPago);

module.exports = router;