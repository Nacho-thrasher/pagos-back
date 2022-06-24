const router = require('express').Router();

const { get_boleta } = require('../controllers/get_boleta');

router.get('/', get_boleta);

module.exports = router;