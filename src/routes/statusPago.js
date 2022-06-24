const router = require('express').Router();

const { getStatusPago} = require('../controllers/statusPago');

router.get('/', getStatusPago);

module.exports = router;