const Client           = require('node-rest-client').Client;
const TokenDataModulo  = require('../lib/token_data');
const { object }       = require('../helpers/objectToken');
const { DECIDIR_URL }  = process.env;
const { IToken } = require('../db/models/IToken');

const createToken = async(req, res) => {
    try {
        //? pasar a middleware para validar el request
        let args = object(req.body);
        let tokenData = new TokenDataModulo.tokenData(args);
        args = tokenData.getJSON();
        let client = new Client();
        client.post(DECIDIR_URL + "tokens", args, function(data, response) {
            //? cargar data en modelo de datos para el token
            let token = new IToken(data);
            res.status(200).json({
                message: 'Token creado',
                data: token
            });
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
    createToken
}
