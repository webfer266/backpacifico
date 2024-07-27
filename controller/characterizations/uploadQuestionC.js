const { subirArchivo } = require('../../helpers/upload');
const path = require('path');
const {readFileSync} = require('fs');
const {parse} = require('csv-parse/sync');
const answerCharacterization = require('../../models/characterization/answerCharacterization');
const questionCharacterization = require('../../models/characterization/questionCharacterization');


const upload = async (req,res) => {
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
    const [total,answer]=await Promise.all([
        answerCharacterization.countDocuments(),
        answerCharacterization.find()
    ]);
    for (let index = 0; index < csvContent.length; index++) {
        for (let q = 0; q < answer.length; q++) {
            const {idQuestion,campo1,campo2,cuestionario,nameQuestion,campo4}=await csvContent[index];  
                const {_id,idAnswer,idQuestionRef,nameOpcion} =await answer[q];
                if (idQuestion-idQuestionRef===0) {
                    const id=_id.toString();
                    let answerRef=id;
                    const question = new questionCharacterization({idQuestion,nameQuestion,answerRef})
                     question.save();   
                }



    
        }
    }
    res.json({msg:'hola desde upload question'});
}

module.exports=upload;