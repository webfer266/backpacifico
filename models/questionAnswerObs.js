const {mongoose,Schema,model} = require('mongoose')


const questionAnswerObs = Schema({

    form:[{
    idQuestion:{
        type:Number
    },
    nameQuestion:{
        type:String
    },
    answerRef:[{
        idAnswer:Number,
        nameOpcion:String
    }]
}]
})


module.exports=model('questionAnswerObs',questionAnswerObs)