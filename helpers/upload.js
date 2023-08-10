
const {v4: uuidv4} = require('uuid')
const path =require('path');
const { arch } = require('os');

const subirArchivo = (files, extensionValida = ['csv','txt'], carpeta='') => {

    return new Promise ( (resolve, reject) => {
        const {archivo} = files;
        const nombreCortado=archivo.name.split('.');
        const extension =nombreCortado[nombreCortado.length-1];

        //validar la extension
        if(!extensionValida.includes(extension)){
            return reject('la extension no es permitida');
        }
        nameTemp=uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname,'../public/uploads', carpeta,nameTemp);
        
         archivo.mv(uploadPath, (err) => {
            if(err){
                reject (err)
            }

            resolve(nameTemp);
        })
    })
}

module.exports = {
    subirArchivo};