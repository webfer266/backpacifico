const { subirArchivo } = require('../../helpers/upload');
const path = require('path');
const { readFileSync } = require('fs');
const {parse} = require('csv-parse/sync');
const questionAnswerCha = require('../../models/characterization/questionAnswerCha');
const questionCharacterization = require('../../models/characterization/questionCharacterization');
const Api = require('../../helpers/reponse-Api')


const questionGet = async (req,res) => {
    const responseApi = new Api()

    try{
        
    const [total,question]=await Promise.all([
        questionAnswerCha.aggregate(
            [
                {$unwind:"$characterization"},
                {$group:{_id:{idQuestion:"$characterization.idQuestion"},
                nameQuestion:{$first:"$characterization.nameQuestion"},
                nameOpcion:{$push:"$characterization.nameOpcion"}
                }}
        
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




const questionAnswer =async (req,res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'no files were uploaded'})
        return;
    }
    const pathCompleto=await subirArchivo(req.files)  
    //archivo en base de datos

    const patloading=path.join(__dirname,'../../public/uploads',`${pathCompleto}`)
    const fileContent =readFileSync(patloading,'utf-8')
    const csvContent=await parse(fileContent,{
        columns:true,
        delimiter:[';',',']
    });

    const [total,answerbd]=await Promise.all([
        questionCharacterization.countDocuments(),
        questionCharacterization.find().populate('answerRef')
    ]);
    //array para llenar modelo 
    const characterization=[];
    let contador=0;
    let array={};
    for (let index = 0; index < csvContent.length; index++) {
        const {id_answer,question_id,option_question_id,open_answer,...resto}= csvContent[index];  
        for (let bd = 0; bd < answerbd.length; bd++) {
            let {idQuestion,nameQuestion,answerRef}=answerbd[bd];
            let [{idAnswer,nameOpcion}]=answerRef 
            if(idAnswer-option_question_id===0){
                if (open_answer.length!=0) {
    
                    nameOpcion=open_answer;
                    array={idQuestion,nameQuestion,idAnswer,nameOpcion};
                    characterization.push(array)
                    if((csvContent.length-(contador+1))===0){
                        const result=new questionAnswerCha({characterization})
                        result.save();   
                    }
                }

                else{
                    array={idQuestion,nameQuestion,nameOpcion};
                    characterization.push(array)
                    if((csvContent.length-(contador+1))===0){
                        const result=new questionAnswerCha({characterization})
                        result.save();   
                    }
                }
                
            }
        }

        contador++;

    }

    res.json({
        msg:'hola desde questionAnswer',
    })
}



const observationGetId =async (req,res) =>{
    const responseApi = new Api();

    try{

        console.log(req.params.id);
    const [total,question]=await Promise.all([
        
        questionAnswerCha.aggregate(
        [
            {$unwind:'$characterization'},
            {$match:{"characterization.idQuestion":(parseInt(req.params.id))}},
            {$group:{_id:{idQuestion:"$characterization.idQuestion"},
            nameQuestion:{$first:"$characterization.nameQuestion"},
            nameOpcion:{$push:"$characterization.nameOpcion"}
            }}
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
module.exports={
    questionAnswer,
    questionGet,
    observationGetId
}

