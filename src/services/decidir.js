// const paymentInfoMod  = require('../lib/payment_info');
const getAllPaymentsMod = require('../lib/all_payments');
const sdkModulo = require('../lib/sdk');
const axios = require('axios');
const { 
DECIDIR_URL, 
DECIDIR_PUBLIC_KEY, 
DECIDIR_PRIVATE_KEY } = process.env;
//? sdk modulo
const sdk = new sdkModulo.sdk('developer', DECIDIR_PUBLIC_KEY, DECIDIR_PRIVATE_KEY);
//? ejecutar pago no se realizara aqui 
const ejecutarPago = (payment) => {
    return new Promise((resolve, reject) => {
        const decidir = require('decidir');
        const decidirClient = new decidir.default(process.env.DECIDIR_API_KEY, process.env.DECIDIR_API_SECRET);
        decidirClient.payments.create(payment, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

const getPagoDecidir = async(siteTransactionId) => {
    if (siteTransactionId == null || siteTransactionId.length == 0) {
        return null;     
    }
    try {
        // let timeout = 2
        // const decidir = new decidir.default(process.env.DECIDIR_API_KEY, process.env.DECIDIR_API_SECRET, timeout)
        // return decidir.payments.get(siteTransactionId);
        //? siteTransactionId si tiene %20 se reemplaza por espacio
        siteTransactionId = siteTransactionId.replace(/%20/g, ' ');
        const payments = await axios.get(`${DECIDIR_URL}payments`, {
            params: {
                'siteOperationId': siteTransactionId
            },
            headers: {
                'Content-Type': 'application/json',
                'apikey': DECIDIR_PRIVATE_KEY,
                'Cache-Control': 'no-cache'
            }
        })
        return payments.data.results;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const postPagoDecidir = async(paymentRequest, movim, amount, cuotas, siteId) => {
    if (paymentRequest == null || movim == null) return null;     
    //? con los datos del usuario se genero el pago
    console.log('llego a postPagoDecidir'); //? token es transaction_id
    try {
        const args = {
            "establishment_name": "UCASAL",
            "token": paymentRequest.token,
            "site_transaction_id": movim.nro_transac,
            "payment_method_id": paymentRequest.paymentMethodId,
            "site_id": siteId, 
            "bin": paymentRequest.bin,
            "amount": amount,
            "currency": "ARS",
            "installments": cuotas,
            "payment_type": "single",
            "sub_payments": [] //? consultar aqui
        }
        const payment = await axios.post(`${DECIDIR_URL}payments`,
            args, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': DECIDIR_PRIVATE_KEY,
                    'Cache-Control': 'no-cache'
                }  
            }
        )
        return payment.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getPagoDecidir, postPagoDecidir };