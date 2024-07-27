const {readFileSync} = require('fs');
const path = require('path');
const {parse} = require('csv-parse/sync');
const { subirArchivo } = require('../../helpers/upload');
const answerObservation = require('../../models/observations/answerObservation');

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
        columns:true,
        delimiter:[';',',']
    });


    for (let index = 0; index < csvContent.length; index++) {
        
            const {idAnswer,idQuestionRef,nameOpcion}=await csvContent[index];  

                    const answer = new answerObservation({idAnswer,idQuestionRef,nameOpcion})
                    answer.save();
    }
    res.json({msg:'archivo subido'})
  
}

module.exports=upload;