//? configurar dev o produccion
module.exports = {
    development: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING
    },
    production: {}
}