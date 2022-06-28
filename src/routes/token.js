const router = require('express').Router();
//controller
const { createToken } = require('../controllers/token');

router.post('/', createToken);

module.exports = router;