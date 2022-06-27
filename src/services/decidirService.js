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

const obtenerPago = async(siteTransactionId) => {
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

module.exports = {  obtenerPago };