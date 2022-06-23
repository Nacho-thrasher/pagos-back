const router = require('express').Router();
//controller
const { createTokenController } = require('../controllers/createTokenController');

router.post('/', createTokenController);

module.exports = router;