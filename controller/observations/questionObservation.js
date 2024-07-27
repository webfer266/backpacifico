const questionObservation= require('../../models/observations/questionObservation');
const Api = require('../../helpers/reponse-Api')

const getQuestion = async (req, res) => {
    const responseApi = new Api()

    try {
        const [total,question]=await Promise.all([
            questionObservation.aggregate(
                [
                    {$lookup:{
                        from: "answerobservations",
                        localField:"answerRef",
                        foreignField:"_id",
                        as:"result"
                    }},
                    {$unwind:"$result"},

                    { $match: {idQuestion: {$gte:1}}},
                    {$group:{_id:{                    
                        idQuestion:"$idQuestion",
                        nameQuestion:"$nameQuestion",},
                        answerRef:{$push:"$result.nameOpcion"}
                        }},
    

                    
                    ])
        ]);
        if (total === 0) {
            responseApi.setState("200", "success", "questions not found")
            responseApi.setResult({ total, question })
        } else {
            responseApi.setState("200", "success", "questions found")
            responseApi.setResult({ total, question })
        }
    } catch (error) {
        responseApi.setState("500", "error", "Request Failed");
        responseApi.setResult(error);
    }

    res.json(responseApi.toResponse());

}

const postQuestion = async (req,res) => {
    
    const responseApi = new Api()

    const {idQuestion,nameQuestion,answerRef} = req.body;
    const answer =await new questionObservation({idQuestion,nameQuestion,answerRef})
    answer.save();
    responseApi.setState("201", "success", "Answer created successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());

}

const updateQuestion = async (req,res) => {
    const responseApi = new Api()

    const {id}=await req.params;
    const {...resto}=await req.body;
    const answer= await questionObservation.findByIdAndUpdate(id,resto);
    answer.save();
    responseApi.setState("201", "success", "Answer updated successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());

}

const deleteQuestion = async (req,res)=> {
    const responseApi = new Api()

    const {id}=req.params;
    const answer = await questionObservation.findByIdAndDelete(id);
    responseApi.setState("201", "success", "Answer deleted successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());

}

module.exports= {
    getQuestion,
    postQuestion,
    updateQuestion,
    deleteQuestion
}