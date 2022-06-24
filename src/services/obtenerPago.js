var sdkModulo = require('../lib/sdk');
const { DECIDIR_PRIVATE_KEY, DECIDIR_PUBLIC_KEY, DECIDIR_URL } = process.env;
//? es la funcion que recibe el site transac id 
export const obtenerPago = async(siteTransactionId) => {
    if (!siteTransactionId) {return null }
    try {
        const timeout = 10
        const decidir = new sdkModulo.sdk(DECIDIR_PRIVATE_KEY, DECIDIR_URL, timeout)
         

    } catch (error) {
        console.log(error);
        return null;
    }
}