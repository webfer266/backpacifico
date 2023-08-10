const AnswerObservation= require('../models/answerObservation');
const Api = require('../helpers/reponse-Api')
const {readFileSync} = require('fs');
const path = require('path');
const {parse} = require('csv-parse/sync');
const { subirArchivo } = require('../helpers/upload');



const getAnswer = async (req, res) => {
    const responseApi = new Api()
    try {
        const [total,answer]=await Promise.all([
            AnswerObservation.countDocuments(),
            AnswerObservation.find().populate('questionRef')
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

const postAnswer = (req,res) => {
    res.json('hola desde')
}

const upload= async (req,res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'no files were uploaded'})
        return;
    }
    const pathCompleto=await subirArchivo(req.files)

    //archivo en base de datos

    const patloading=path.join(__dirname,'../public/uploads',`${pathCompleto}`)
    const fileContent =readFileSync(patloading,'utf-8')
    const csvContent=await parse(fileContent,{
        columns:['idAnswer','idQuestionCsv','nameOpcion'],
        delimiter:[';',',']
    });


    for (let index = 0; index < csvContent.length; index++) {
        
            const {idAnswer,idQuestionCsv,nameOpcion}=await csvContent[index];  
                    const answer = new AnswerObservation({idAnswer,idQuestionCsv,nameOpcion})
                    answer.save();
    }
    res.json({msg:'archivo subido'})
  
}

const updateAnswer = async (req,res) => {
    const responseApi = new Api()

    const {id}=await req.params;
    const {_id,...resto}=await req.body;
    const answer= await AnswerObservation.findByIdAndUpdate(id,resto);
   answer.save();
    responseApi.setState("201", "success", "Answer updated successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());
}

const deleteAnswer = async (req,res)=> {
    const responseApi = new Api()

    const {id}=req.params;
    const answer = await AnswerObservation.findByIdAndDelete(id);
    responseApi.setState("201", "success", "Answer deleted successfully")
    responseApi.setResult(answer)

    res.json(responseApi.toResponse());
}

module.exports= {
    getAnswer,
    postAnswer,
    updateAnswer,
    deleteAnswer,
    upload
}