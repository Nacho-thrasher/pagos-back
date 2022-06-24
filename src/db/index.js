const { connection } = require('./config/index');
// const { models } = require('../db/models');

const initializeDb = async () => {
    try {
        await connection();
        // await models();
    } catch (error) {
        console.log('No se pudo conectar a db',error)
    }
}
module.exports = {
    initializeDb
}