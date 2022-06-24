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
    }
);
}

