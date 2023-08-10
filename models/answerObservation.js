const {Schema, model, mongoose} = require('mongoose')

const answerObservation = Schema({

    idAnswer:{
        type: Number,
        required:true,
    },
    idQuestionCsv:{
        type: Number,
        required:true,
    },

    nameOpcion:{
        type: String,
        required: true
    }

})
module.exports= model('answerObservations',answerObservation)