const router = require('express').Router();
//controller
const { create_token } = require('../controllers/token_controller');

router.post('/', create_token);

module.exports = router;