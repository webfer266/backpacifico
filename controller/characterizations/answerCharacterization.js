const AnswerCharacterization= require('../../models/characterization/answerCharacterization');
const Api = require('../../helpers/reponse-Api')




const getAnswer = async (req, res) => {
    const responseApi = new Api()
    try {
        const [total,answer]=await Promise.all([
            AnswerCharacterization.countDocuments(),
            AnswerCharacterization.find()
        ]);

        if (total === 0) {
            responseApi.setState("200", "success", "Answers not found")
            responseApi.setResult({ total, answer })
        } else {
            responseApi.setState("200", "success", "Answers found")
            responseApi.setResult({ total, answer })
        }

    } catch (error) {
        responseApi.setState("500", "error", "Request Failed");
        responseApi.setResult(error);    
    }
    res.json(responseApi.toResponse())

}

const postAnswer = async (req,res) => {
    const responseApi = new Api()
    const {idAnswer,idQuestionRef,nameOpcion} = req.body;
    const answer =await new AnswerCharacterization({idAnswer,idQuestionRef,nameOpcion})
    answer.save();
    responseApi.setState("201", "success", "Answer created successfully")
    responseApi.setResult(answer)
    res.json(responseApi.toResponse());
}

const updateAnswer = async (req,res) => {
    const responseApi = new Api()

    const {id}=await req.params;
    const {_id,...resto}=await req.body;
    const answer= await AnswerCharacterization.findByIdAndUpdate(id,resto);
   answer.save();
    responseApi.setState("201", "success", "Answer updated successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());
}

const deleteAnswer = async (req,res)=> {
    const responseApi = new Api()

    const {id}=req.params;
    const answer = await AnswerCharacterization.findByIdAndDelete(id);
    responseApi.setState("201", "success", "Answer deleted successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());
}

module.exports= {
    getAnswer,
    postAnswer,
    updateAnswer,
    deleteAnswer,
}