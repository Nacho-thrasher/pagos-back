const router = require('express').Router();

const { get_status_pago } = require('../controllers/pago_controller');

router.get('/', get_status_pago);

module.exports = router;