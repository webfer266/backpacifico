const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {
    

    constructor(){
        this.app = express() //I create on my server the express application as a property on the server
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            answerO: '/api/answerObservation',
            answerQ:'/api/questionObservation',
            result: '/api/questionsAnswers'
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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/'
        }))

    }

    routes(){
        //ENDPOINT
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.answerO, require('../routes/answerObservation'));
        this.app.use(this.paths.answerQ, require('../routes/questionObservation'));
        this.app.use(this.paths.result, require('../routes/questionAnswerObs'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }


}

module.exports = Server;