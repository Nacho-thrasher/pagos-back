
const axios = require('axios');
const TokenDataModulo = require('../lib/token_data');
const PaymentDataModulo = require("../lib/payment_data");
var querystring = require('querystring');
var sdkModulo = require('../lib/sdk');
const { DECIDIR_PRIVATE_KEY, DECIDIR_PUBLIC_KEY, DECIDIR_URL } = process.env;
// example {
//     "card_number": "4507990000004905",
//     "card_expiration_month": "08",
//     "card_expiration_year": "27",
//     "security_code": "123",
//     "card_holder_name": "John Doe",
//     "card_holder_identification": {
//       "type": "dni",
//       "number": "25123456"
//     }
//   }
const createTokenController = async(req, res) => {
    console.log(DECIDIR_URL);
    try {
        const args = { 
            ...req.body,
        }
        const tokenData = new TokenDataModulo.tokenData(args);
        //? axios request to create token
        const response = await axios.post(DECIDIR_URL + '/tokens', 
            tokenData.getJSON(), 
        {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'apikey': DECIDIR_PUBLIC_KEY
            }
        });
        // return response
        res.json(response.data);



    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: 'Error al crear el token',
            error
        });
    }
}

module.exports = {
    createTokenController
}
