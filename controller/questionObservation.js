const questionObservation= require('../models/questionObservation');
const Api = require('../helpers/reponse-Api')
const { subirArchivo } = require('../helpers/upload');
const path = require('path');
const {readFileSync} = require('fs');
const {parse} = require('csv-parse/sync');
const answerObservation = require('../models/answerObservation');

const getQuestion = async (req, res) => {
    const responseApi = new Api()

    try {
        const [total,answer]=await Promise.all([
            questionObservation.countDocuments(),
            questionObservation.find().populate('answerRef')
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

    res.json(responseApi.toResponse());

}

const postQuestion = async (req,res) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'no files were uploaded'})
        return;
    }
    const pathCompleto=await subirArchivo(req.files)    
    //archivo en base de datos
    const patloading=path.join(__dirname,'../public/uploads',`${pathCompleto}`)
    const fileContent =readFileSync(patloading,'utf-8')
    const csvContent=await parse(fileContent,{
        columns:['idQuestion','campo1','campo2','cuestionario','nameQuestion','campo4'],
        delimiter:[';',',']
    });
    const [total,answer]=await Promise.all([
        answerObservation.countDocuments(),
        answerObservation.find()
    ]);
    for (let index = 0; index < csvContent.length; index++) {

        for (let q = 0; q < answer.length; q++) {
            const {idQuestion,nameQuestion}=await csvContent[index];  
                const {_id,idAnswer,idQuestionCsv,nameOpcion} =await answer[q];
                if (idQuestion-idQuestionCsv===0) {
                    const id=_id.toString();
                    let answerRef=id;
                    const question = new questionObservation({idQuestion,nameQuestion,answerRef})
                     question.save();   
                }



    
        }
    }
    res.json({msg:'hola desde aqui de la prision'});

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