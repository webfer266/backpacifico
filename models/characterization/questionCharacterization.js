const {model, Schema, mongoose} = require ('mongoose');
 
const questionCharacterizations = Schema({
    idQuestion:{
        type: Number,
        required:true,
    },

    nameQuestion:{
        type: String,
        required: true
    },
    answerRef:[{
        ref:"answerCharacterizations",
        type: mongoose.Schema.Types.ObjectId
    }]

})

module.exports=model('questionCharacterizations',questionCharacterizations)