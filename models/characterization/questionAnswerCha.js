const {mongoose,Schema,model} = require('mongoose')


const questionAnswerChars = Schema({

    characterization:[{
        idQuestion:{
            type:Number
        },
        nameQuestion:{
            type:String
        },
        idAnswer:{
            type:Number
        },
        nameOpcion:{
            type:String}
}]
})


module.exports=model('questionAnswerChars',questionAnswerChars)