const jwt = require('jsonwebtoken');

const generateJWT  = (uid = '') => {

    return new Promise((resolve, reject)=> {
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETOPRIMARYKEY,{
            expiresIn: '4h'
        },(err, token)=>{
            if(err){
                reject('Something went wrong');
                console.log(err);
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}