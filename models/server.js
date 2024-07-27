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
            questionO:'/api/questionObservation',
            answerC:'/api/answerCharacterization',
            questionC:'/api/questionCharacterization',
            obsevation: '/api/questionsAnswersO',
            Characterization: '/api/questionsAnswersC',
            uploadAnswerO:'/api/uploadAnsO',
            uploadQuestionO:'/api/uploadQuesO',
            uploadAnswerC:'/api/uploadAnsC',
            uploadQuestionC:'/api/uploadQuesC',
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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/',
            createParentPath: true
        }))

    }

    routes(){
        //ENDPOINT
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.answerO, require('../routes/answerObservation'));
        this.app.use(this.paths.questionO, require('../routes/questionObservation'));
        this.app.use(this.paths.obsevation, require('../routes/questionAnswerObs'));
        this.app.use(this.paths.uploadAnswerO, require('../routes/uploadAnswersO'));
        this.app.use(this.paths.uploadQuestionO, require('../routes/uploadQuestionO'));
        this.app.use(this.paths.answerC, require('../routes/characterizations/answerCharacterization'));
        this.app.use(this.paths.uploadAnswerC, require('../routes/characterizations/uploadAnswersC'));
        this.app.use(this.paths.questionC, require('../routes/characterizations/questioncharacterization'));
        this.app.use(this.paths.uploadQuestionC, require('../routes/characterizations/uploadQuestionC'));
        this.app.use(this.paths.Characterization, require('../routes/characterizations/questionAnswerCha'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }


}

module.exports = Server;