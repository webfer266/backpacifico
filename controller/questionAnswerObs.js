const { subirArchivo } = require('../helpers/upload');
const path = require('path');
const { readFileSync } = require('fs');
const {parse} = require('csv-parse/sync');
const questionAnswerObs = require('../models/questionAnswerObs');
const questionObservation = require('../models/questionObservation');


const questionAnswer =async (req,res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'no files were uploaded'})
        return;
    }
    const pathCompleto=await subirArchivo(req.files)  
    //archivo en base de datos

    const patloading=path.join(__dirname,'../public/uploads',`${pathCompleto}`)
    const fileContent =readFileSync(patloading,'utf-8')
    const csvContent=await parse(fileContent,{
        columns:true,
        delimiter:[';',',']
    });

    const [total,answerbd]=await Promise.all([
        questionObservation.countDocuments(),
        questionObservation.find().populate('answerRef')
    ]);
    
    //array para llenar modelo 
    const form=[];
    let contador=0;
    for (let index = 0; index < csvContent.length; index++) {
        const {id_answer,question_id,option_question_id,...resto}= csvContent[index];  
        for (let bd = 0; bd < answerbd.length; bd++) {
            const {idQuestion,nameQuestion,answerRef}=answerbd[bd];
            let [{idAnswer,nameOpcion}]=answerRef 
            if(idAnswer-option_question_id===0){
                let array={idQuestion,nameQuestion,answerRef};
                form.push(array)
                
                if((csvContent.length-(contador+1))===0){
                    const result=new questionAnswerObs({form})
                    result.save();   
                }
                
            }
        }

        contador++;

    }

    res.json({
        msg:'hola desde questionAnswer',
    })
}
module.exports={
    questionAnswer
}