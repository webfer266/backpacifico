const {model, Schema, mongoose} = require ('mongoose');
 
const questionObservation = Schema({
    idQuestion:{
        type: Number,
        required:true,
    },

    nameQuestion:{
        type: String,
        required: true
    },
    answerRef:[{
        ref:"answerObservations",
        type: mongoose.Schema.Types.ObjectId
    }]

})

module.exports=model('questionObservations',questionObservation)