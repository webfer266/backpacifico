const {Schema, model, mongoose} = require('mongoose')

const answerCharacterizations = Schema({

    idAnswer:{
        type: Number,
        required:true,
    },
    idQuestionRef:{
        type: Number,
        required:true,
    },

    nameOpcion:{
        type: String,
        required: true
    }

})
module.exports= model('answerCharacterizations',answerCharacterizations)