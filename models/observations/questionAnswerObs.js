const {mongoose,Schema,model} = require('mongoose')


const questionAnswerObs = Schema({

    observation:[{
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


module.exports=model('questionAnswerObs',questionAnswerObs)