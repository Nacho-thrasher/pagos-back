require('dotenv').config(); //? for use enviroment variables
const morgan = require ('morgan');
const routes = require ('./src/routes/index.js');
//connect con db
const express = require ('express');
const server = express();
let cors = require('cors')
const path = require('path'); 

//   initializeDb usar db
// const { initializeDb } = require('./src/db/index');
// initializeDb();
//   connection();
//   models();


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/', routes);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

