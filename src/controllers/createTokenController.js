var Client = require('node-rest-client').Client;
const TokenDataModulo = require('../lib/token_data');
const { DECIDIR_PRIVATE_KEY, DECIDIR_PUBLIC_KEY, DECIDIR_URL } = process.env;
const object = require('../helpers/objectToken');

const createTokenController = async(req, res) => {
    try {
        //? pasar a middleware para validar el request
        const args = object(req.body);
        var tokenData = new TokenDataModulo.tokenData(args);
        args = tokenData.getJSON();
        var client = new Client();
        client.post(DECIDIR_URL + "tokens", args, function(data, response) {
            res.status(200).send(data);
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al crear el token',
            error: error
        });
    }
}

module.exports = {
    createTokenController
}
