const router = require('express').Router();

const { get_boleta } = require('../controllers/boleta_controller');

router.get('/', get_boleta);

module.exports = router;