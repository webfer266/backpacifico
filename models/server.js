const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');


class Server {
    

    constructor(){
        this.app = express() //I create on my server the express application as a property on the server
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            user: '/api/user'
        }

        // Connect the database
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Routes of my application
        this.routes();
    }

    async conectarDB (){
        await dbConnection();
    }

    middlewares(){

        //Protect our server superficially
        this.app.use(cors());

        //Parsing and reading the body
        this.app.use(express.json());

    }

    routes(){
        //ENDPOINT
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }


}

module.exports = Server;