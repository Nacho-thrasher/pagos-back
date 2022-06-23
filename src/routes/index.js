const { Router } = require('express');

const createTokenRoute = require('./createToken');

const router = Router();

router.use('/token', createTokenRoute);

module.exports = router;